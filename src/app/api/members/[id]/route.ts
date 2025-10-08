import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const prisma = new PrismaClient();
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 m"),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { success } = await ratelimit.limit(
    req.headers.get("x-forwarded-for") || "anonymous"
  );
  if (!success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  try {
    const session = await auth();
    if (!session || !session.user.tenantId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { name, email, phone } = await req.json();

    const member = await prisma.member.update({
      where: { id, tenantId: session.user.tenantId, deletedAt: null },
      data: { name, email, phone },
    });

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

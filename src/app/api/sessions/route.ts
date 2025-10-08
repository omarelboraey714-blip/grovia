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

export async function POST(req: Request) {
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

    const { classId, startTime, endTime } = await req.json();
    if (!classId || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newSession = await prisma.session.create({
      data: {
        classId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        tenantId: session.user.tenantId,
      },
    });

    return NextResponse.json(newSession, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

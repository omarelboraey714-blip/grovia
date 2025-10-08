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

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1") || 1;
    const limit = parseInt(searchParams.get("limit") || "10") || 10;
    const skip = (page - 1) * limit;

    const members = await prisma.member.findMany({
      where: { tenantId: session.user.tenantId, deletedAt: null },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        subscriptions: {
          select: { status: true, endDate: true },
          where: { status: "ACTIVE" },
          take: 1,
        },
      },
    });

    const total = await prisma.member.count({
      where: { tenantId: session.user.tenantId, deletedAt: null },
    });

    return NextResponse.json({ members, total, page, limit });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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

    const { name, email, phone } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }

    const member = await prisma.member.create({
      data: {
        tenantId: session.user.tenantId,
        name,
        email,
        phone,
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

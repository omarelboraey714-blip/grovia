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

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const totalRevenue = await prisma.invoice.aggregate({
      where: {
        tenantId: session.user.tenantId,
        paidAt: { gte: startOfDay, lte: endOfDay },
        status: "PAID",
      },
      _sum: { amount: true },
    });

    const activeMembers = await prisma.subscription.count({
      where: {
        tenantId: session.user.tenantId,
        status: "ACTIVE",
        endDate: { gte: new Date() },
      },
    });

    const classesToday = await prisma.session.count({
      where: {
        tenantId: session.user.tenantId,
        startTime: { gte: startOfDay, lte: endOfDay },
      },
    });

    return NextResponse.json({
      total_revenue: totalRevenue._sum.amount || 0,
      active_members: activeMembers,
      classes_today: classesToday,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const period = searchParams.get("period") || "monthly";

    let startDate = new Date();
    if (period === "daily") startDate.setHours(0, 0, 0, 0);
    else if (period === "weekly") startDate.setDate(startDate.getDate() - 7);
    else if (period === "monthly") startDate.setMonth(startDate.getMonth() - 1);

    const sales = await prisma.invoice.findMany({
      where: {
        tenantId: session.user.tenantId,
        paidAt: { gte: startDate },
        status: "PAID",
      },
      select: { amount: true, paidAt: true },
      orderBy: { paidAt: "asc" },
    });

    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

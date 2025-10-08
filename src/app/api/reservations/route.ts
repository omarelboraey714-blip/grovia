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

    const { sessionId, memberId, action } = await req.json();
    if (!sessionId || !memberId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (action === "book") {
      const reservation = await prisma.reservation.create({
        data: {
          sessionId,
          memberId,
          status: "BOOKED",
        },
      });
      await prisma.session.update({
        where: { id: sessionId, tenantId: session.user.tenantId },
        data: { reservationsCount: { increment: 1 } },
      });
      return NextResponse.json(reservation, { status: 201 });
    } else if (action === "cancel") {
      await prisma.reservation.deleteMany({
        where: { sessionId, memberId },
      });
      await prisma.session.update({
        where: { id: sessionId, tenantId: session.user.tenantId },
        data: { reservationsCount: { decrement: 1 } },
      });
      return NextResponse.json({ message: "Reservation canceled" });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

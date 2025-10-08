import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { code, tenantSlug } = await req.json();

  if (!code || !tenantSlug) {
    return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
  });
  if (!tenant) {
    return NextResponse.json(
      { error: "صالة الجيم غير موجودة" },
      { status: 404 }
    );
  }

  const verificationToken = await prisma.resetToken.findUnique({
    where: { token: code, type: "VERIFY" },
    include: { user: true },
  });

  if (
    !verificationToken ||
    verificationToken.tenantId !== tenant.id ||
    verificationToken.expiresAt < new Date()
  ) {
    return NextResponse.json(
      { error: "رمز التحقق غير صالح أو منتهي الصلاحية" },
      { status: 401 }
    );
  }

  await prisma.user.update({
    where: { id: verificationToken.userId },
    data: {
      /* Add verified field if needed in schema */
    },
  });

  await prisma.resetToken.delete({ where: { token: code } });

  return NextResponse.json({ message: "تم التحقق من البريد الإلكتروني" });
}

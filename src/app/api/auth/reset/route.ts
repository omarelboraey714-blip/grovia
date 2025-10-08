import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { token, password, tenantSlug } = await req.json();

  if (!token || !password || !tenantSlug) {
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

  const resetToken = await prisma.resetToken.findUnique({
    where: { token, type: "RESET" },
    include: { user: true },
  });

  if (
    !resetToken ||
    resetToken.tenantId !== tenant.id ||
    resetToken.expiresAt < new Date()
  ) {
    return NextResponse.json(
      { error: "رمز إعادة التعيين غير صالح أو منتهي الصلاحية" },
      { status: 401 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { hashpass: hashedPassword },
  });

  await prisma.resetToken.delete({ where: { token } });

  return NextResponse.json({ message: "تم إعادة تعيين كلمة المرور" });
}

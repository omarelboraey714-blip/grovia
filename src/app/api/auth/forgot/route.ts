import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { email, tenantSlug } = await req.json();

  if (!email || !tenantSlug) {
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

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.tenantId !== tenant.id) {
    return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
  }

  const resetToken = randomUUID();
  await prisma.resetToken.create({
    data: {
      userId: user.id,
      tenantId: tenant.id,
      token: resetToken,
      type: "RESET",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth?form=reset&token=${resetToken}`;
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "إعادة تعيين كلمة المرور - FitFlow",
    html: `<p>انقر <a href="${resetUrl}">هنا</a> لإعادة تعيين كلمة المرور الخاصة بك.</p>`,
  });

  return NextResponse.json({ message: "تم إرسال رابط إعادة التعيين" });
}

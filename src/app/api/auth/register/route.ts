import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
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
  const { name, email, password, tenantSlug, role } = await req.json();

  if (!name || !email || !password || !tenantSlug) {
    return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
  }

  let tenant = await prisma.tenant.findUnique({ where: { slug: tenantSlug } });
  if (!tenant) {
    if (role !== "OWNER") {
      return NextResponse.json(
        { error: "صالة الجيم غير موجودة" },
        { status: 404 }
      );
    }
    tenant = await prisma.tenant.create({
      data: { name: tenantSlug, slug: tenantSlug },
    });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json(
      { error: "المستخدم موجود بالفعل" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const user = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      role: role || "MEMBER",
      email,
      name,
      hashpass: hashedPassword,
    },
  });

  await prisma.resetToken.create({
    data: {
      userId: user.id,
      tenantId: tenant.id,
      token: verificationCode,
      type: "VERIFY",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  });

  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth?form=verify&token=${verificationCode}`;
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "تأكيد البريد الإلكتروني - FitFlow",
    html: `<p>رمز التحقق الخاص بك هو: <strong>${verificationCode}</strong></p><p>أو انقر <a href="${verificationUrl}">هنا</a> لتأكيد بريدك الإلكتروني.</p>`,
  });

  return NextResponse.json({
    message: "تم إنشاء الحساب، تحقق من بريدك الإلكتروني",
  });
}

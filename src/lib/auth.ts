import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// تعريف interface للـ User
interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  tenantId: string;
  tenantName: string;
}

// توسيع نوع الـ Session
declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}

// توسيع نوع الـ JWT
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    tenantId?: string;
    tenantName?: string;
  }
}

// Singleton pattern for PrismaClient
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email?.trim() || !credentials?.password?.trim()) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            tenantId: true,
            hashpass: true,
            tenant: { select: { name: true } },
          },
        });

        if (!user || !user.tenant?.name || !user.hashpass) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashpass
        );
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: user.tenantId,
          tenantName: user.tenant.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.role = authUser.role;
        token.tenantId = authUser.tenantId;
        token.tenantName = authUser.tenantName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.role && typeof token.role === "string") {
        session.user.role = token.role;
      }
      if (token.tenantId && typeof token.tenantId === "string") {
        session.user.tenantId = token.tenantId;
      }
      if (token.tenantName && typeof token.tenantName === "string") {
        session.user.tenantName = token.tenantName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

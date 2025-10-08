// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || ""; // e.g. fitzone.example.com or localhost:3000
  let tenantSlug: string | null = null;

  // 1) Try subdomain (prod). Exclude localhost and common hosts
  if (host && !host.startsWith("localhost")) {
    const hostnameParts = host.split(".");
    // hostnameParts[0] is the subdomain in fitzone.example.com
    const possible = hostnameParts[0];
    // exclude 'www', 'app' etc. adjust as needed
    if (possible && !["www", "app"].includes(possible)) {
      tenantSlug = possible;
    }
  }

  // 2) Fallback to path-based: /g/:slug/...
  if (!tenantSlug) {
    const pathname = url.pathname; // e.g. /g/fitzone/classes
    const parts = pathname.split("/").filter(Boolean); // ["g","fitzone","classes"...]
    if (parts[0] === "g" && parts[1]) {
      tenantSlug = parts[1];
      // rewrite to remove /g/:slug prefix so app pages see clean path
      const newPath = "/" + parts.slice(2).join("/");
      url.pathname = newPath === "/" ? "/" : newPath;
      // optionally keep tenant in search params so server handlers can read it:
      url.searchParams.set("tenant", tenantSlug);
      const res = NextResponse.rewrite(url);
      // set cookie (accessible on both client and server)
      res.cookies.set("tenant", tenantSlug, { path: "/", sameSite: "lax" });
      return res;
    }
  }

  // 3) If we found subdomain tenant or nothing to do, continue and set cookie
  const res = NextResponse.next();
  if (tenantSlug) {
    res.cookies.set("tenant", tenantSlug, { path: "/", sameSite: "lax" });
  }
  return res;
}

export const config = {
  matcher: [
    "/((?!api/auth|api/webhooks|_next/static|_next/image|favicon.ico).*)",
  ],
};

// middleware.js
import { NextResponse, NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // allow public files, _next, favicon, etc — Next handles this normally but being explicit helps
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgotpassword")
  ) {
    return NextResponse.next();
  }

  try {
    // getSessionCookie should accept the NextRequest (better-auth/cookies API)
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      // If it's an API call, return 401 JSON
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Otherwise redirect to login and preserve original path in ?from=
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // session exists -> allow
    return NextResponse.next();
  } catch (err) {
    // If something goes wrong when checking the cookie, behave similarly
    console.error("Middleware auth check failed:", err);

    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/builder/:path*",
  ],
};

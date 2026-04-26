import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;
  const url = request.nextUrl;

  if (url.pathname.startsWith("/admin")) {
    const key = url.searchParams.get("key");

    if (!adminSecret || key !== adminSecret) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
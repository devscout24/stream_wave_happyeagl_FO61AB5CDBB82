import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Protect all /chat routes: redirect to sign-in if not authenticated
  if (pathname.startsWith("/chat")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  // If logged in, prevent access to home, sign-in, and sign-up pages
  if (
    accessToken &&
    (pathname === "/" ||
      pathname.startsWith("/auth/sign-in") ||
      pathname.startsWith("/auth/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/:path*", // Include all auth routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Run on most routes
  ],
};

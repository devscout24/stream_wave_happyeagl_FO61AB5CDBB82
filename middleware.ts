import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname, searchParams } = request.nextUrl;
  const modal = searchParams.get("modal");

  // Protected routes that require authentication
  const protectedRoutes = ["/chat", "/profile"];

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // If accessing protected route without token, redirect to home with sign-in modal
  if (isProtectedRoute && !accessToken) {
    const signInUrl = new URL("/", request.url);
    signInUrl.searchParams.set("modal", "sign-in");
    // Add redirect parameter to return user to original page after login
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If logged in and trying to access auth modals, redirect to chat
  if (
    accessToken &&
    (modal === "sign-in" ||
      modal === "sign-up" ||
      modal === "forgot-password" ||
      modal === "verify-email")
  ) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // If logged in and accessing home page without modal, redirect to /chat
  if (accessToken && pathname === "/" && !modal) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat",
    "/chat/:path*",
    "/profile",
    "/profile/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Run on most routes
  ],
};

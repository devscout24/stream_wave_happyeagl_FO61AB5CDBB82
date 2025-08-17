import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ["/chat", "/profile"];

  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // If accessing protected route without token, redirect to sign-in
  if (isProtectedRoute && !accessToken) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    // Add redirect parameter to return user to original page after login
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If logged in and accessing auth pages, redirect to chat
  if (
    accessToken &&
    (pathname.startsWith("/auth/sign-in") ||
      pathname.startsWith("/auth/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // Allow access to home page regardless of authentication status
  // This handles the case when users are redirected after logout/delete profile
  if (pathname === "/") {
    return NextResponse.next();
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
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/:path*", // Include all auth routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Run on most routes
  ],
};

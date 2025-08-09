// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const accessToken = request.cookies.get("access_token")?.value;

//   // Example: Protect all routes under /dashboard
//   if (request.nextUrl.pathname.startsWith("/dashboard")) {
//     if (!accessToken) {
//       // Redirect to sign-in if not authenticated
//       return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//     }
//   }

//   // Allow all other requests
//   return NextResponse.next();
// }

// // Optionally, define which paths to run middleware on
// export const config = {
//   matcher: ["/dashboard/:path*"], // Protect all /dashboard routes
// };

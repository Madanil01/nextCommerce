import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authCheck } from "./lib/authCheck";

export async function middleware(request: NextRequest) {
  const verify = await authCheck(request);
  console.log(verify.isAdmin);

  // Check if verify.isAdmin is undefined
  if (verify.isAdmin === undefined) {
    // Allow access to /login and /signup
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup"
    ) {
      return NextResponse.next();
    }
  } else if (verify.status) {
    if (
      verify.isAdmin == true &&
      request.nextUrl.pathname.startsWith("/admin")
    ) {
      return NextResponse.next();
    } else if (
      verify.isAdmin == false &&
      request.nextUrl.pathname.startsWith("/user")
    ) {
      return NextResponse.next();
    }
  }
  // If not allowed, redirect to a different route (e.g., '/')
  return NextResponse.redirect(new URL("/notfound", request.url));
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/login", "/signup"]
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import axios from "axios";
// import { authCheck } from "./lib/authCheck";
// export async function middleware(request: NextRequest) {
//   const verify = await authCheck(request);
//   console.log(verify.isAdmin);
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === "/login" || path === "/signup";

//   const token = request.cookies.get("token")?.value || "";

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/", "/profile", "/login", "/signup"],
// };

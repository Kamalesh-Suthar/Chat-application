import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAuthRoute = (pathname: string) => {
  const authRoutes = ["/signin", "/signup"];
  return authRoutes.includes(pathname);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  console.log(request.url);

  // Authenticated users shouldn't access auth routes
  if (isAuthRoute(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Non-authenticated users can only access auth routes
  if (!isAuthRoute(pathname) && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup"],
};

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt"; // path to your helper

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const token = req.cookies.get("token")?.value;

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", pathname + search);

  if (!token) return NextResponse.redirect(loginUrl);

  try {
    // use your helper to verify token and get user ID
    verifyToken(token);
    // optionally attach userId to request headers if needed
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/users/payment", "/profile", "/cart"], // protected routes
};

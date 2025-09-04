import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt"

export function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    verifyToken(token)
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
export const config = {
  matcher: ["/cart", "/users/payemnt"], // protect all dashboard routes
};

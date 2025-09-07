

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = req.headers.get("Authorization")?.split(" ")[1];

  // Prepare login URL with "from" query param
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("from", pathname);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/cart", "/users/payemnt"], // protect specific routes
};


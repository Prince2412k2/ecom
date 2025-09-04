import { NextResponse } from "next/server";

export async function GET() {
  // Expire the cookie by setting it to empty with maxAge 0
  const res = NextResponse.json({ msg: "Logged out" });

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",         // clear it for whole site
    sameSite: "lax",
    maxAge: 0,
  });

  return res;
}

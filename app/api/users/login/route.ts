import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { createToken } from "@/lib/jwt"
import z from "zod";
import { validateUser } from "@/lib/ValidateUser"
const LoginRequest = z.object({
  email: z.email(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email, password } = LoginRequest.parse(body);
    const user = await validateUser({ password, email })
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const payload = {
      id: user._id,
      type: user.userType,
      email: user.email,
    };
    const token = createToken(payload);
    const res = NextResponse.json({ userType: user.userType }, { status: 200 })
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    return res
  } catch (err: unknown) {
    console.error(err)
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

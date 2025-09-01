
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
    const token = createToken({ id: user._id, email: user.email });
    return NextResponse.json({ token, user })
  } catch (err: unknown) {
    console.error(err)
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

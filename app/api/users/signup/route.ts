import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userSchema";
import UserRequest from "./schema";
import z from "zod";
import connect from "@/lib/dbConnect"
import { hashPassword } from "@/lib/password";


export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json()

    //schema validation
    const parsed = UserRequest.parse(body)
    //hash password before saving
    parsed.password = await hashPassword(parsed.password)

    const newUser = await User.create(parsed)
    console.log(newUser)
    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 })
    }
    if (err.code === 11000) {
      return NextResponse.json({ error: "Email Already Exists", status: 400 })
    }
    console.error(err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

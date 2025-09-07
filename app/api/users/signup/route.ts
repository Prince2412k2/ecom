import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userSchema";
import UserRequest from "./schema";
import connect from "@/lib/dbConnect"
import { hashPassword } from "@/lib/password";
import { createToken } from "@/lib/jwt"
import { ZodError } from "zod/v3";
import { MongoServerError } from "mongodb";

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
    const token = createToken({ id: String(newUser._id), email: newUser.email });
    const res = NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
    res.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })


    return res;

  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 })
    } else if (err instanceof MongoServerError) {
      if (err.code === 11000) {

        return NextResponse.json({ error: "Email Already Exists" }, { status: 400 })
      }
      console.error(err);
      return NextResponse.json({ error: "server error" }, { status: 500 });
    }
  }
}

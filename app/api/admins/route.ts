import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userSchema";
import { hashPassword } from "@/lib/password";
import { getUserWithToken } from "@/lib/users/getUsers";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserWithToken(token);
  if (!user || user.userType !== "Super") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const admins = await User.find({ userType: "Admin" });
  return NextResponse.json(admins);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserWithToken(token);
  if (!user || user.userType !== "Super") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, email, password } = await req.json();
  const hashedPassword = await hashPassword(password);

  const newAdmin = await User.create({
    name,
    email,
    password: hashedPassword,
    userType: "Admin",
  });

  return NextResponse.json(newAdmin, { status: 201 });
}

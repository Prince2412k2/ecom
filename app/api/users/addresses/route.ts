import { NextRequest, NextResponse } from "next/server";
import { getUserWithToken } from "@/lib/users/getUsers";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserWithToken(token);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { address } = await req.json();
  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  user.addresses.push(address);
  await user.save();

  return NextResponse.json(user.addresses);
}

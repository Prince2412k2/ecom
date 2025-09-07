
import { getUserWithToken } from "@/lib/users/getUsers"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token) return NextResponse.json({ loggedIn: false }, { status: 401 });
  const user = await getUserWithToken(token)
  if (!user) return NextResponse.json({ loggedIn: false }, { status: 401 });
  return NextResponse.json({ loggedIn: true }, { status: 200 });
}

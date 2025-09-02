import { NextRequest, NextResponse } from 'next/server';
import { getUserWithCart } from "@/lib/cart/getCart"


export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const cart = getUserWithCart(token)
  if (!cart) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json(cart, { status: 200 });
}


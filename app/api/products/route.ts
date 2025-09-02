import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from "@/lib/jwt"
import { getProducts } from "@/lib/products/getAllProducts"

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = verifyToken(token)
  if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  const products = await getProducts()
  if (!products) return NextResponse.json({ error: 'Products not found' }, { status: 404 });
  return NextResponse.json(products, { status: 200 });

}


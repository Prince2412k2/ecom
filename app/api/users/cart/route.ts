import { NextRequest, NextResponse } from 'next/server';
import { getUserWithToken } from "@/lib/users/getUsers"
import AddToCart from '@/lib/cart/addProductToCart';
import AddCartRequest from './schema';
import { ZodError } from 'zod/v3';
import { getCartWithToken } from '@/lib/cart/getCart';


export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const cart = await getCartWithToken(token)
  if (!cart) return NextResponse.json({ error: 'Access Not Allowed' }, { status: 401 });
  return NextResponse.json(cart, { status: 200 });
}


export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  if (!token) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })
  }

  try {
    const cart = await getUserWithToken(token)
    if (!cart) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })
    }
    const body = await req.json()
    const { id, quantity } = AddCartRequest.parse(body)

    const status = await AddToCart(token, id, quantity)
    if (!status) {
      return NextResponse.json({ msg: "Invalid User" }, { status: 404 })
    }


    return NextResponse.json({ msg: "success", cart }, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ msg: err.errors }, { status: 400 })
    }
    console.error(err)
    return NextResponse.json({ error: "server error" }, { status: 500 })
  }
}


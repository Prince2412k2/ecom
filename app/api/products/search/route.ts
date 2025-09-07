import { NextRequest, NextResponse } from 'next/server';
import SearchRequest from './schema';
import { ZodError } from 'zod/v3';
import { SearchProduct } from '@/lib/products/searchProduct';
import { rateLimit } from './rateLimit';


export async function POST(req: NextRequest) {
  try {
    //rateLimiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    rateLimit(ip); // enforce 1 request/sec per IP

    const body = await req.json()
    const { query } = SearchRequest.parse(body)
    const products = await SearchProduct(query)
    if (!products) return NextResponse.json({ msg: "Products Not Found" }, { status: 404 })
    return NextResponse.json({ msg: "success", products }, { status: 201 })

  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ msg: err.errors }, { status: 400 })
    }
    console.error(err)
    return NextResponse.json({ error: "server error" }, { status: 500 })
  }
}

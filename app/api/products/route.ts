import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from "@/lib/jwt"
import { getProducts } from "@/lib/products/getAllProducts"
import { getUserWithToken } from '@/lib/users/getUsers';
import { Product } from '@/models/productSchema';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserWithToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let products;
  if (user.userType === "Super") {
    products = await Product.find();
  } else if (user.userType === "Admin") {
    products = await Product.find({ user: user._id });
  } else {
    products = await getProducts();
  }

  if (!products) return NextResponse.json({ error: 'Products not found' }, { status: 404 });
  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserWithToken(token);
  if (!user || (user.userType !== "Admin" && user.userType !== "Super")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const newProduct = await Product.create({ ...body, user: user._id });

  return NextResponse.json(newProduct, { status: 201 });
}
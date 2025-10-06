import { NextRequest, NextResponse } from 'next/server';
import { getUserWithToken } from '@/lib/users/getUsers';
import { Product } from '@/models/productSchema';
import dbConnect from '@/lib/dbConnect';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserWithToken(token);
  if (!user || (user.userType !== "Admin" && user.userType !== "Super")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const updatedProduct = await Product.findByIdAndUpdate(params.id, body, { new: true });

  if (!updatedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserWithToken(token);
  if (!user || (user.userType !== "Admin" && user.userType !== "Super")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const deletedProduct = await Product.findByIdAndDelete(params.id);

  if (!deletedProduct) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product deleted successfully" });
}

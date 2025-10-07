import { NextRequest, NextResponse } from 'next/server';
import { getUserWithToken } from '@/lib/users/getUsers';
import { Product } from '@/models/productSchema';
import User from '@/models/userSchema';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserWithToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let totalSales = 0;
  let totalOrders = 0;
  let totalCustomers = 0;

  if (user.userType === 'Super') {
    const allUsers = await User.find({ isDeleted: false });
    totalCustomers = allUsers.length;
    for (const u of allUsers) {
      for (const item of u.cart) {
        if (item.purchased) {
          const product = await Product.findById(item.product);
          if (product) {
            totalSales += product.price * item.quantity;
            totalOrders += item.quantity;
          }
        }
      }
    }
  } else if (user.userType === 'Admin') {
    const products = await Product.find({ user: user._id });
    const productIds = products.map(p => p._id);

    const allUsers = await User.find({
      "cart.product": { $in: productIds },
      "cart.purchased": true,
    });

    for (const u of allUsers) {
      for (const item of u.cart) {
        if (item.purchased && productIds.some(pId => pId.equals(item.product))) {
          const product = await Product.findById(item.product);
          if (product) {
            totalSales += product.price * item.quantity;
            totalOrders += item.quantity;
          }
        }
      }
    }
    totalCustomers = allUsers.length;
  }

  return NextResponse.json({
    totalSales,
    totalOrders,
    totalCustomers,
  });
}

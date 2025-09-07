import { verifyToken } from "@/lib/jwt";
import { CartResponseType } from "@/models/cartSchema";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil", // latest stable
});


export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "User not authenticated" }, { status: 401 });

    const userId = verifyToken(token);
    if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: body.items.map((item: CartResponseType) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.product.title },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/products`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      metadata: { userId },
    });

    return NextResponse.json({ id: session.id }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creating Stripe session:", err.message || err);
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


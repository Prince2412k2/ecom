import { togglePaid } from "@/lib/cart/MarkAsPaid";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text(); // raw body, not JSON

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET! // set this in env
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (userId) {
        await togglePaid(userId);
      } else { new Error("userId not found") }
      console.log("💸 Payment successful:", session.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Webhook error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "stripe webhook error" }, { status: 400 });
  }
}


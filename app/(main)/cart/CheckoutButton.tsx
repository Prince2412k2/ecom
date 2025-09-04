"use client";

import { CartResponseType } from "@/models/cartSchema";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutButton({ cart }: { cart: CartResponseType[] }) {
  console.log(cart)
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post("/api/users/payment", { items: cart });
      const stripe = await stripePromise;

      if (!data.id) throw new Error("No session ID returned from backend");

      const { error } = await stripe!.redirectToCheckout({ sessionId: data.id });
      if (error) console.error("Stripe redirect error:", error.message);
    } catch (err) {
      console.error("Checkout error", err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
}

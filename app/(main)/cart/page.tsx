"use client"
import { useEffect, useState } from "react";
import Card from "./card";
import type { CartResponseType } from "@/models/cartSchema";
import axios from "axios";

export default function Page() {
  const [cart, setCart] = useState<CartResponseType[] | null>(null);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get("/api/users/cart");
      const cartData = await res.data;
      setCart(cartData);
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart) {
      const newSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      setSubtotal(newSubtotal);
    }
  }, [cart]);

  if (!cart) {
    return <div>Loading...</div>;
  }

  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="h-screen text-black bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart.map((item, index) => (
            <div key={index}>
              <Card item={item} />
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">${shipping.toFixed(2)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">${total.toFixed(2)} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}

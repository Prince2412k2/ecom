"use client";

import { addToCart } from "@/lib/client/addCartClient";
import { useState } from "react";

export default function AddMoreButton({
  id,
  price,
  max = Infinity,
  defaultItems = 1,
  updateCart,
}: {
  id: string;
  price: number;
  defaultItems?: number;
  max?: number;
  updateCart: (productId: string, newQuantity: number) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpdateCart = async (newQty: number) => {
    try {
      setLoading(true);
      updateCart(id, newQty); // update local state immediately
      await addToCart(id, newQty); // sync with backend
    } catch (err) {
      console.error("Failed to update cart:", err);
      // optional: rollback UI if request fails
      updateCart(id, defaultItems);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-black">
      <div className="flex items-center border-gray-100">
        <button
          disabled={defaultItems < 2 || loading}
          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 
            hover:bg-blue-500 disabled:hover:bg-gray-500 hover:text-blue-50"
          onClick={() => handleUpdateCart(defaultItems - 1)}
        >
          -
        </button>

        <div className="size-8 bg-white flex border-2 border-gray-100">
          <h1 className="align-middle text-center self-center w-full text-xs text-black">
            {defaultItems}
          </h1>
        </div>

        <button
          disabled={defaultItems >= (max ?? Infinity) || loading}
          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 
            hover:bg-blue-500 disabled:hover:bg-gray-500 hover:text-blue-50"
          onClick={() => handleUpdateCart(defaultItems + 1)}
        >
          +
        </button>
      </div>

      <div className="flex items-baseline text-gray-600 space-x-4">
        <p className="text-md">{defaultItems * price} $</p>
      </div>
    </div>
  );
}

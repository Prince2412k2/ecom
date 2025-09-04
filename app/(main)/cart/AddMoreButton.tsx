"use client";

import { addToCart } from "@/lib/client/addCartClient";
import { useState } from "react";


export default function AddMoreButton({
  id,
  price,
  max = Infinity,
  defaultItems = 1,
}: {
  id: string;
  price: number;
  defaultItems?: number;
  max?: number;
}) {
  const [items, setItems] = useState<number>(defaultItems);
  const [loading, setLoading] = useState(false);

  const updateCart = async (newQty: number) => {
    try {
      setLoading(true);
      setItems(newQty); // update local state immediately
      await addToCart(id, newQty); // sync with backend
    } catch (err) {
      console.error("Failed to update cart:", err);
      // optional: rollback UI if request fails
      setItems(items);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-black">
      <div className="flex items-center border-gray-100">
        <button
          disabled={items < 2 || loading}
          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 
            hover:bg-blue-500 disabled:hover:bg-gray-500 hover:text-blue-50"
          onClick={() => updateCart(items - 1)}
        >
          -
        </button>

        <div className="size-8 bg-white flex border-2 border-gray-100">
          <h1 className="align-middle text-center self-center w-full text-xs text-black">
            {items}
          </h1>
        </div>

        <button
          disabled={items >= (max ?? Infinity) || loading}
          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 
            hover:bg-blue-500 disabled:hover:bg-gray-500 hover:text-blue-50"
          onClick={() => updateCart(items + 1)}
        >
          +
        </button>
      </div>

      <div className="flex items-baseline text-gray-600 space-x-4">
        <p className="text-sm">{items * price} $</p>
      </div>
    </div>
  );
}

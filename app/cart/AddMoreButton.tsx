"use client";

import { useState } from "react";
export default function AddMoreButton({ price, defaultItems = 1, max = Infinity }: { price: number, defaultItems: number, max: number }) {
  const [items, setItems] = useState<number>(defaultItems)
  return (
    <div className="flex flex-col gap-8 text-black">
      <div className="flex   items-center border-gray-100">
        <button disabled={items < 2} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100  hover:bg-blue-500 disabled:hover:bg-gray-500 hover:text-blue-50" onClick={() => setItems(items > 1 ? items - 1 : 1)}> - </button>
        <div className="size-8 bg-white flex border-2 border-gray-100">
          <h1 className="align-middle text-center self-center w-full text-xs text-black">{items}</h1>
        </div>
        <button disabled={items >= max} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 disabled:hover:bg-gray-500 hover:text-blue-50" onClick={() => setItems(items < max ? items + 1 : max)}> + </button>
      </div>
      <div className="flex items-baseline text-gray-600 space-x-4">
        <p className="text-sm">{items * price} $</p>
      </div>
    </div>
  )
}

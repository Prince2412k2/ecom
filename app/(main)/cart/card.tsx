import Image from "next/image"
import AddMoreButton from "./AddMoreButton"
import type { CartResponseType } from "@/models/cartSchema"

type CardProp = {
  item: CartResponseType
}

export default async function Card({ item }: CardProp) {
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <Image width={500} height={500} src={item.product.image} alt={`${item.product.title}-product-image`} className="w-full rounded-lg sm:w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{`${(item.product.title).split(" ").slice(0, 4).join(" ")}...`}</h2>

          <p className="mt-1 text-xs text-gray-700">{item.product.category}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <AddMoreButton id={item.product._id.toString()} price={item.product.price} defaultItems={item.quantity} max={item.product.quantity} />
        </div>
      </div>
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { ProductResponseType } from "@/models/productSchema"



const ProductGridItem = async ({ item }: { item: ProductResponseType }) => {
  const { _id, title, image, price, brand, category, model, color, onSale, discount } = item;
  console.log(image)
  return (
    <Link href={`/product/${_id}`}>
      <div className="border-l-2 border-4 p-2 bg-white" >
        <Image src={image} width={500} height={300} className="border-4" alt={title} />
        <p>{title}</p>
        <p>{brand}</p>
        <p>{category}</p>
        <p className="text-right text-[11px] font-bold mt-2.5 mr-2.5 p-1.5 rounded-sm">{price}</p>
      </div>
    </Link>
  )
}


export default ProductGridItem

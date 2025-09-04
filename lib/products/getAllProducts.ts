import { Product, ProductResponseType } from "@/models/productSchema"
import dbConnect from "../dbConnect";

export async function getProducts(offset: number = -1, catagory: string = "all"): Promise<Array<ProductResponseType> | null> {

  await dbConnect()
  const find = catagory === "all" ? {} : { category: catagory.toLowerCase() };
  const products = offset === -1 ?
    await Product.find(find).sort({ randomSeed: 1, _id: 1 })
    : await Product.find(find).sort({ randomSeed: 1, _id: 1 }).skip(offset).limit(20);

  if (!products.length) return null
  return products

}

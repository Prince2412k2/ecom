import { Product, type ProductResponseType } from "@/models/productSchema"
import dbConnect from "../dbConnect";

export async function getProductsByCate(category: string): Promise<Array<ProductResponseType> | null> {
  await dbConnect()
  const product = await Product.find({ category: category });
  if (!product) return null
  return product
}

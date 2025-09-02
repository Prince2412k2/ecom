import { Product, ProductResponseType } from "@/models/productSchema"
import dbConnect from "../dbConnect";

export async function getProducts(): Promise<Array<ProductResponseType> | null> {
  await dbConnect()
  const products = await Product.find({});
  if (!products) return null
  return products
}

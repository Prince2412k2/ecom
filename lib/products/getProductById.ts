import { Product, ProductResponseType } from "@/models/productSchema"
import dbConnect from "../dbConnect";
import { Types } from "mongoose";

export async function getProductById(id: string): Promise<ProductResponseType | null> {
  await dbConnect()
  const product = await Product.findOne({ _id: new Types.ObjectId(id) });
  if (!product) return null
  return product
}

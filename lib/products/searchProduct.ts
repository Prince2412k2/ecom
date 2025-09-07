import { Product, ProductSearchResult } from "@/models/productSchema"
import dbConnect from "../dbConnect";


export async function SearchProduct(query: string, limit = 10, skip = 0): Promise<Array<ProductSearchResult> | null> {
  await dbConnect()
  const product: ProductSearchResult[] = await Product.find(
    { $text: { $search: query } },
    { _id: 1, title: 1, image: 1, score: { $meta: "textScore" } }
  ).sort(
    { score: { $meta: "textScore" } }
  ).skip(skip).limit(limit).lean<ProductSearchResult[]>();
  if (!product) return null
  return product
}

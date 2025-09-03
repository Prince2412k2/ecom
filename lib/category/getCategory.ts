import { Category, CategoryResponseType } from "@/models/categorySchema"
import dbConnect from "../dbConnect";

export async function getCategories(): Promise<Array<CategoryResponseType> | null> {
  await dbConnect()
  const categories = await Category.find();
  if (!categories) return null
  return categories
}

import { getUserWithToken } from "@/lib/users/getUsers";

import { Types } from "mongoose"
import { DbUserType } from "@/models/userSchema";
import { CartItemType } from "@/models/cartSchema";


export default async function AddToCart(
  token: string,
  product_id: string,
  quantity: number
): Promise<boolean> {
  const user: DbUserType | null = await getUserWithToken(token);
  if (!user) return false;

  const prodId = new Types.ObjectId(product_id);

  // Find cart item by comparing ObjectIds safely
  const existing: CartItemType | undefined = user.cart.find((item) => {
    // item.product is populated Product, but TypeScript still allows ObjectId
    const itemId = "_id" in item.product ? item.product._id : item.product;
    return (itemId as Types.ObjectId).equals(prodId);
  });

  if (existing) {
    // Update quantity
    existing.quantity = quantity;
  } else {
    // Add new item
    user.cart.push({
      product: prodId,
      quantity,
      addedAt: new Date(),
      purchased: false,
    });
  }

  await user.save();
  return true;
}

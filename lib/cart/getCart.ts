import User from "@/models/userSchema";
import { verifyToken } from "@/lib/jwt"
import type { CartResponseType } from "@/models/cartSchema"

export async function getUserWithCart(token: string): Promise<Array<CartResponseType> | null> {
  const id = verifyToken(token)
  if (!id) return null
  const user = await User.findById(id, { cart: 1 }).populate("cart.productId")
  if (!user) return null
  return user.cart
}

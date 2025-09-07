import User from "@/models/userSchema";
import { verifyToken } from "@/lib/jwt"
import { CartResponseType } from "@/models/cartSchema";
import dbConnect from "../dbConnect";
import "@/models/productSchema";

export async function getCartWithToken(
  token: string
): Promise<CartResponseType[] | null> {
  await dbConnect();
  const id = verifyToken(token);
  if (!id) return null;

  const user = await User.findById(id).populate("cart.product") // populates each cart item's product
  if (!user) return null;
  const cart = user.cart

  return cart as unknown as CartResponseType[];
}

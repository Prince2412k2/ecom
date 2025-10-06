import User from "@/models/userSchema";
import { verifyToken } from "@/lib/jwt"
import { CartResponseType } from "@/models/cartSchema";
import dbConnect from "../dbConnect";
import "@/models/productSchema";

export async function getCartWithToken(
  token: string
): Promise<CartResponseType[] | null> {
  await dbConnect();
  const payload = verifyToken(token);
  if (!payload) return null;
  const id = payload.id;

  const user = await User.findById(id).populate("cart.product") // populates each cart item's product
  if (!user) return null;
  const cart = user.cart

  return cart as unknown as CartResponseType[];
}

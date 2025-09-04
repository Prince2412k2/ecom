import User, { DbUserType } from "@/models/userSchema";
import { verifyToken } from "@/lib/jwt"
import { CartResponseType } from "@/models/cartSchema";
import dbConnect from "../dbConnect";
import "@/models/productSchema";

export async function getUserWithToken(token: string): Promise<DbUserType | null> {
  await dbConnect();
  const id = verifyToken(token);
  if (!id) return null;

  const user = await User.findById(id)
    .populate("cart.product"); // <- populate the 'product' field inside each cart item

  if (!user) return null;
  return user;
}
export async function getUserWithId(id: string): Promise<DbUserType | null> {
  await dbConnect();
  const user = await User.findById(id)
  if (!user) return null;
  return user;
}



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

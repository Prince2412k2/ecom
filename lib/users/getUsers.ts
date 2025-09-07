
import User, { DbUserType, UserResponseType } from "@/models/userSchema";
import { verifyToken } from "@/lib/jwt"
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

export async function getUserWithId(id: string): Promise<UserResponseType | null> {
  await dbConnect();
  const user = await User.findById(id).populate("cart.product").lean<UserResponseType>() // populates each cart item's product
  if (!user) return null;
  return user;
}
export async function getUserById(id: string): Promise<DbUserType | null> {
  //not lean
  await dbConnect();
  const user = await User.findById(id).populate("cart.product")
  if (!user) return null;
  return user;
}


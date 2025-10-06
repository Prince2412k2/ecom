import mongoose, { Schema, Document, Types } from "mongoose";
import { CartItemType, CartResponseType, CartSchema } from "./cartSchema";

export type UserType = {
  name: string;
  password: string;
  email: string;
}

export type DbUserType = Document & UserType & {
  cart: Types.DocumentArray<CartItemType>;
  addresses: string[];
  isDeleted: boolean;
  userType: "Customer" | "Admin" | "Super";
};

export type UserResponseType = {
  _id: Types.ObjectId,
  name: string,
  email: string,
  cart: Array<CartResponseType>,
  addresses: string[];
  isDeleted: boolean;
  userType: "Customer" | "Admin" | "Super";
}

const UserSchema = new Schema<DbUserType>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  cart: { type: [CartSchema], default: [] },
  addresses: { type: [{ type: String, required: false }], default: [] },
  userType: { type: String, enum: ["Customer", "Admin", "Super"], default: "Customer" },
  isDeleted: { type: Boolean, required: true, default: false }
})

export default mongoose.models.User || mongoose.model<DbUserType>("User", UserSchema)

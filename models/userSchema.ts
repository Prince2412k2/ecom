import mongoose, { Schema, Document, Types } from "mongoose";
import { CartItemType, CartSchema } from "./cartSchema";

export type UserType = {
  name: string;
  password: string;
  email: string;
}

export type DbUserType = Document & UserType & {
  cart: Types.DocumentArray<CartItemType>;
  addresses: string[];
  isDeleted: boolean;
  userType: string;
};

const UserSchema = new Schema<DbUserType>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  cart: { type: [CartSchema], default: [] },
  addresses: { type: [{ type: String, required: false }], default: [] },
  userType: { type: String, default: "Customer" },
  isDeleted: { type: Boolean, required: true, default: false }
})

export default mongoose.models.User || mongoose.model<DbUserType>("User", UserSchema)

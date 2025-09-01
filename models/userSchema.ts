import mongoose, { Schema, Document, Types } from "mongoose";

type CartItemType = {
  product: Types.ObjectId; // ref to Product
  quantity: number;
  addedAt: Date;
  purchased: boolean;
};
const CartSchema = new Schema<CartItemType>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: () => new Date() },
  purchased: { type: Boolean, default: false },
});

export type UserType = {
  name: string;
  password: string;
  email: string;

}

export type DbUserType = Document & UserType & {
  cart: typeof CartSchema[];
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

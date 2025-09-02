import { ProductType } from "./productSchema";
import { Schema, Types } from "mongoose";


export type CartItemType = {
  product: Types.ObjectId; // ref to Product
  quantity: number;
  addedAt: Date;
  purchased: boolean;
};

export const CartSchema = new Schema<CartItemType>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: () => new Date() },
  purchased: { type: Boolean, default: false },
});

export type CartResponseType = {
  product: ProductType & {
    _id: Types.ObjectId
  };
  quantity: number;
  addedAt: Date;
  purchased: boolean;
};

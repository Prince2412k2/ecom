import { Schema, model, models, Types } from "mongoose";

export type ProductType = {
  title: string
  image: string;
  price: number;
  brand: string;
  category: string;

  // optional fields
  model: string;
  color: string;
  onSale: boolean;
  discount: number;
};

export type ProductResponseType = ProductType & { _id: Types.ObjectId };


const ProductSchema = new Schema<ProductType>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },

  // optional fields
  model: { type: String, default: "" },
  color: { type: String, default: "" },
  onSale: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
});

export const Product = models.Product || model<ProductType>("Product", ProductSchema);


import { Schema, model, models, Types, ObjectId } from "mongoose";
export type ProductType = {
  title: string
  image: string;
  price: number;
  brand: string;
  category: string;
  quantity: number;
  user: string;
  addedAt: Date;
  lastSale?: Date;
  sold: number;

  // optional fields
  model: string;
  color: string;
  onSale: boolean;
  discount: number;
};

export type ProductResponseType = ProductType & { _id: Types.ObjectId };

export type ProductSearchResult = {
  _id: ObjectId;
  title: string;
  image: string;
  score: number; // from text search
}


const ProductSchema = new Schema<ProductType>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  addedAt: { type: Date, default: Date.now },
  lastSale: { type: Date },
  sold: { type: Number, default: 0 },

  // optional fields
  model: { type: String, default: "" },
  color: { type: String, default: "" },
  onSale: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
});


// Regular index on category for faster filtering 
ProductSchema.index({ category: 1 });

// Compound index on category + price for sorting/filtering
ProductSchema.index({ category: 1, price: -1 });

// Text index for keyword search
ProductSchema.index({ title: "text", brand: "text", category: "text" });


export const Product = models.Product || model<ProductType>("Product", ProductSchema);


import mongoose, { Types, ObjectId, Schema } from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from 'fs';

dotenv.config()

const uri = process.env.MONGODB_URI ?? "";
const rawData = readFileSync("./data.json", "utf-8")

const userId = new Types.ObjectId("68e35a97a4e57202d90efcc3");

export type ProductType = {
  title: string
  image: string;
  price: number;
  brand: string;
  category: string;
  quantity: number;

  // optional fields
  model: string;
  color: string;
  onSale: boolean;
  discount: number;
  user: Types.ObjectId;
};

export type ProductResponseType = ProductType & { _id: Types.ObjectId };


const ProductSchema = new Schema<ProductType>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },

  // optional fields
  model: { type: String, default: "" },
  color: { type: String, default: "" },
  onSale: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

await mongoose.connect(uri, {});
const Product = mongoose.models.Product || mongoose.model<ProductType>("Product", ProductSchema);






const products: ProductType[] = JSON.parse(rawData);

const productsWithUser = products.map(product => ({
  ...product,
  user: userId
}));

(async () => {
  try {
    await Product.insertMany(productsWithUser);
  } catch (err) {
    console.error("? Error inserting data:", err);
  } finally {
    await mongoose.connection.close();
  }
})();



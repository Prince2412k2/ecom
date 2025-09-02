import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from 'fs';

dotenv.config()

const uri = process.env.MONGODB_URI ?? "";
const rawData = readFileSync("./data.json", "utf-8")

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


const ProductSchema = new mongoose.Schema<ProductType>({
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

await mongoose.connect(uri, {});
const Product = mongoose.models.Product || mongoose.model<ProductType>("Product", ProductSchema);






const products: ProductType[] = JSON.parse(rawData);
products = products.map((obj) =>)

  // 4. Insert into MongoDB
  (async () => {
    try {
      await Product.insertMany(products);
      console.log("? Data inserted successfully");
    } catch (err) {
      console.error("? Error inserting data:", err);
    } finally {
      await mongoose.connection.close();
    }
  })();



import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from 'fs';

dotenv.config()

const userName = process.env.DBUser ?? "";
const password = process.env.DBPass ?? "";
if (!userName || !password) {
  console.error("Please Provide userName and password for database in env")
}
const uri = `mongodb+srv://${userName}:${password}@cluster0.roswvl1.mongodb.net/Ecom?retryWrites=true&w=majority&appName=Cluster0`;
const rawData = readFileSync("./data.json", "utf-8")




await mongoose.connect(uri, {});

// 2. Define schema & model
const productSchema = new mongoose.Schema({
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

const Product = mongoose.model("Product", productSchema);

// 3. Read JSON file
type ProductType = {
  image: string;
  price: number;
  brand: string;
  model: string;
  color: string;
  category: string;
  onSale?: boolean;
  discount?: number;
};

const products: ProductType[] = JSON.parse(rawData);

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



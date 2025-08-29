import mongoose, { Schema, Document } from "mongoose";
import * as fs from "fs";

import dotenv from "dotenv";

dotenv.config()

const userName = process.env.DBUser ?? "";
const password = process.env.DBPass ?? "";
if (!userName || !password) {
  console.error("Please Provide userName and password for database in env")
}
const uri = `mongodb+srv://${userName}:${password}@cluster0.roswvl1.mongodb.net/Ecom?retryWrites=true&w=majority&appName=Cluster0`;


interface ICategory extends Document {
  name: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, unique: true, required: true }
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);

async function main() {
  await mongoose.connect(uri);

  // read your JSON file
  const categories = JSON.parse(fs.readFileSync("./cate.json", "utf-8"));

  // convert product IDs into ObjectIds
  const docs = categories.map((cat: any) => ({
    name: cat.name,
  }));

  // insert into db
  await Category.insertMany(docs);

  console.log("Inserted categories with product references ?");

  await mongoose.disconnect();
}

main().catch(console.error);

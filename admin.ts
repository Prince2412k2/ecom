// admin-create.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "readline";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/userSchema";
import "./models/cartSchema";

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(query, (ans) => { rl.close(); resolve(ans.trim()); }));
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    const name = await askQuestion("Enter admin name: ");
    const email = await askQuestion("Enter admin email: ");
    const password = await askQuestion("Enter admin password: ");

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({ name, email, password: hashedPassword, userType: "Admin" });

    console.log("Admin created:", admin);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
})();

export {};
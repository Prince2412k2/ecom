// admin-create.ts
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");
require("dotenv").config();

const User = require("./models/userSchema"); // keep your schema as-is
const CartSchema = require("./models/cartSchema"); // just require so it loads

function askQuestion(query: string) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(query, (ans) => { rl.close(); resolve(ans.trim()); }));
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const name = await askQuestion("Enter admin name: ");
    const email = await askQuestion("Enter admin email: ");
    const password = await askQuestion("Enter admin password: ");

    const existing = await User.findOne({ email });
    if (existing) return console.log("Admin already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({ name, email, password: hashedPassword, userType: "Admin" });

    console.log("Admin created:", admin);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
})();

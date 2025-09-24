import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

async function createAdmin() {
  const existing = await Admin.findOne({ email: "admin1@gmail.com" });
  if (existing) {
    console.log("Admin already exists!");
    return process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("admin123", salt);

  const admin = new Admin({
    name: "Sri Charani",
    email: "admin1@gmail.com",
    password: hashedPassword
  });

  await admin.save();
  console.log("Admin created successfully!");
  process.exit(0);
}

createAdmin();

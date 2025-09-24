// createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config(); // Load .env variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function createAdmin() {
  try {
    const email = "admin1@gmail.com";
    const password = "admin123";

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists!");
      mongoose.disconnect();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword,
      name: "Admin One",
      role: "main"
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();

// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import path from "path";

import submissionRoutes from "./routes/submission.js";
import adminRoutes from "./routes/adminRoutes.js";
import User from "./models/User.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";





dotenv.config();

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// --------------------
// Routes
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin", adminRoutes);

app.use(express.json());
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ LabLogix Backend is running!");
});

// --------------------
// MongoDB Connection
// --------------------
mongoose
  .connect(process.env.MONGO_URI, {
    ssl: true // Atlas requirement
  })
  .then(async () => {
    console.log("✅ MongoDB connected");

    // --------------------
    // Create initial admin (only once)
    // --------------------
    const adminEmail = "admin1@gmail.com";
    const adminPassword = "admin123";

    const existingAdmin = await User.findOne({
      email: adminEmail,
      role: "admin"
    });

    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      const admin = new User({
        name: "Main Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });

      await admin.save();
      console.log(
        `👤 Initial admin created → ${adminEmail} / ${adminPassword}`
      );
    } else {
      console.log("👤 Admin already exists");
    }

    // --------------------
    // Start Server
    // --------------------
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// index.js
import express from "express"; 
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import authRoutes from "./routes/auth.js";
import submissionRoutes from "./routes/submission.js";
import adminRoutes from "./routes/admin.js";
import Admin from "./models/Admin.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// Routes (put before server starts)
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend is running!"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // important for Atlas
})
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Create initial admin if not exists
    const existingAdmin = await Admin.findOne({ email: "admin1@gmail.com" });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      const admin = new Admin({
        email: "admin1@gmail.com",
        password: hashedPassword,
        name: "Main Admin",
        role: "main",
      });

      await admin.save();
      console.log("👤 Initial admin created: admin1@gmail.com / admin123");
    }

    // Start server after DB is ready
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

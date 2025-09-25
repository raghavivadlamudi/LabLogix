import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    // ✅ Safe destructuring with fallback
    const { email, password } = req.body || {};

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();
    console.log("Login attempt:", normalizedEmail);

    // ✅ Try all roles
    let user = await Admin.findOne({ email: normalizedEmail });
    let role = "admin";

    if (!user) {
      user = await Faculty.findOne({ email: normalizedEmail });
      role = "faculty";
    }

    if (!user) {
      user = await Student.findOne({ email: normalizedEmail });
      role = "student";
    }

    if (!user) {
      console.log("❌ No user found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // ✅ Exclude password from response
    const { password: _, ...safeUser } = user._doc;

    console.log("✅ Login successful:", safeUser.email, "Role:", role);
    res.json({ token, role, user: safeUser });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

export default router;

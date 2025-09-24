import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check in Admin, Student, Faculty collections
    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await Faculty.findOne({ email });
      role = "faculty";
    }

    if (!user) {
      user = await Student.findOne({ email });
      role = "student";
    }

    if (!user) return res.status(400).json({ message: "User not found or not registered yet" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, role, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

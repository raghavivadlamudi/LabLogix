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

    if (!user)
      return res
        .status(401)
        .json({ message: "User not found or not assigned yet" });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department || null,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";

const router = express.Router();

// POST login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

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

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "8h" });

    res.json({ token, role, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

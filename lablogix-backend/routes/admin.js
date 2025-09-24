import express from "express";
import bcrypt from "bcryptjs";

import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";

const router = express.Router();

// GET departments + student counts
router.get("/departments", async (req, res) => {
  try {
    const departments = ["CSE", "AI", "IT", "ECE", "EEE", "MECH", "CIVIL"];
    const studentCount = {};

    for (let dept of departments) {
      studentCount[dept] = await Student.countDocuments({ department: dept });
    }

    res.json({ departments, studentCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/admin/register-student
router.post("/register-student", async (req, res) => {
  try {
    const { email, password, name, department, year } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      email,
      password: hashedPassword,
      name,
      department,
      year
    });

    await student.save();
    res.json({ message: "Student registered successfully", student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/register-faculty
router.post("/register-faculty", async (req, res) => {
  try {
    const { email, password, name, department } = req.body;

    const existing = await Faculty.findOne({ email });
    if (existing) return res.status(400).json({ message: "Faculty already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = new Faculty({
      email,
      password: hashedPassword,
      name,
      department
    });

    await faculty.save();
    res.json({ message: "Faculty registered successfully", faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

const express = require("express");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

const router = express.Router();

// Get all departments with student counts
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

// Register a student
router.post("/register-student", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student registered successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register a faculty
router.post("/register-faculty", async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.json({ message: "Faculty registered successfully", faculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

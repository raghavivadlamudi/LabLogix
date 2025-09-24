const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const bcrypt = require("bcryptjs"); // optional for hashed passwords
const jwt = require("jsonwebtoken");

// SECRET for JWT (store in .env in real app)
const JWT_SECRET = "your_jwt_secret";

// STUDENT LOGIN
router.post("/student-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(401).json({ message: "Student not registered yet" });

    // If using plain passwords (not recommended in production)
    if (student.password !== password) return res.status(401).json({ message: "Invalid credentials" });

    // create JWT
    const token = jwt.sign({ id: student._id, role: "student" }, JWT_SECRET);
    res.json({ token, student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FACULTY LOGIN
router.post("/faculty-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const faculty = await Faculty.findOne({ email });
    if (!faculty) return res.status(401).json({ message: "Faculty not registered yet" });

    if (faculty.password !== password) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: faculty._id, role: "faculty" }, JWT_SECRET);
    res.json({ token, faculty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

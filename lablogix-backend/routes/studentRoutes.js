import express from "express";
import { addStudent, studentLogin } from "../controllers/studentController.js";
import Student from "../models/Student.js";   // ⭐⭐⭐ THIS WAS MISSING

const router = express.Router();

// ADD STUDENT
router.post("/add", addStudent);

// STUDENT LOGIN
router.post("/login", studentLogin);

// GET STUDENT PROFILE
router.get("/profile/:regno", async (req, res) => {
  try {
    console.log("REGNO RECEIVED:", req.params.regno);
    const student = await Student.findOne({ regno: req.params.regno }).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (err) {
    console.error("PROFILE ERROR:", err);   // helpful log
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

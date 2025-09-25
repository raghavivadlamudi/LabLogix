// routes/submission.js
import express from "express";
import Submission from "../models/Submission.js";

const router = express.Router();

// Example: get all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Example: create new submission
router.post("/", async (req, res) => {
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

export default router; // ✅ ES module default export

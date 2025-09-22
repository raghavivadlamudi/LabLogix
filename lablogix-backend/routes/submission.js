const express = require("express");
const multer = require("multer");
const Submission = require("../models/Submission");
const router = express.Router();

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Upload lab record
router.post("/upload", upload.single("labFile"), async (req, res) => {
  try {
    const { studentId } = req.body;
    if (!req.file) return res.status(400).send("No file uploaded.");

    const newSubmission = new Submission({
      studentId,
      filePath: req.file.path
    });
    await newSubmission.save();
    res.json({ message: "File uploaded successfully!", filePath: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


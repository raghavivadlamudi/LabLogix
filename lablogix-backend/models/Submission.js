// models/Submission.js
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending", // Can be "Pending", "Evaluated", etc.
  },
  feedback: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission; // ✅ ES module default export

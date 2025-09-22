const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending" // Can be "Pending", "Evaluated", etc.
  },
  feedback: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Submission", submissionSchema);

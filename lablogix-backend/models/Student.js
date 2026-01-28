import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  regno: { type: String, required: true, unique: true, trim: true },
  batch: { type: String, required: true },
  branch: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "student"
  }
});

export default mongoose.model("Student", studentSchema);

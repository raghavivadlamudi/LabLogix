// models/Student.js
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    section: String,
    year: Number,
    phone: String,
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);

export default Student; // ✅ default export for ES Modules

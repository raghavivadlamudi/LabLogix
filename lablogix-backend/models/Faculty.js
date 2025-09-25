// models/Faculty.js
import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  name: String,
  email: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  phone: String
}, { timestamps: true });

const Faculty = mongoose.model("Faculty", FacultySchema);

export default Faculty; // ✅ now works with import Faculty from ...

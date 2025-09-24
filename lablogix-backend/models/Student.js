const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  section: { type: String }, // "A", "B"
  yearOfJoining: Number,
  passwordHash: String, // store hashed password
  role: { type: String, default: 'student' }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);

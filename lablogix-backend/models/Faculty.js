const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: String,
  email: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Faculty', FacultySchema);

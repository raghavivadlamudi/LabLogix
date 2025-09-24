const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  name: String // e.g., "A"
});

const DepartmentSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // e.g., "AIDS"
  name: { type: String, required: true }, // "Artificial Intelligence and Data Science"
  sections: [SectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);

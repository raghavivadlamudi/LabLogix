const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['Lab','Theory'], default: 'Lab' },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }
});

const AcademicSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  year: { type: String, required: true },        // e.g., "1st Year"
  semester: { type: String, required: true },    // e.g., "I-I", "I-II"
  subjects: [SubjectSchema]
}, { timestamps: true });

module.exports = mongoose.model('Academic', AcademicSchema);

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  role: { type: String, default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);

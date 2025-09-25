// routes/student.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Academic = require('../models/Academic');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

function authMiddleware(req, res, next){
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try{
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  }catch(e){
    return res.status(401).json({ message: 'Invalid token' });
  }
}

router.get('/me', authMiddleware, async (req, res) => {
  try{
    const student = await Student.findById(req.user.id).populate('department');
    if(!student) return res.status(404).json({ message: 'Student not found' });

    // fetch the academic entries for this department
    const academics = await Academic.find({ department: student.department._id })
      .populate('subjects.faculty', 'name email')
      .lean();

    // Convert academics into structured Year -> Semesters
    res.json({ student, academics });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

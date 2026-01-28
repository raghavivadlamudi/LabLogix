import bcrypt from "bcryptjs";
import Student from "../models/Student.js";

export const addStudent = async (req, res) => {
  const { name, regno, batch, branch, email } = req.body;

  try {
    // 1. Create default password = regno
    const hashedPassword = await bcrypt.hash(regno, 10);

    // 2. Create student with password
    const student = new Student({
      name,
      regno,
      batch,
      branch,
      email,
      password: hashedPassword
    });

    await student.save();

    res.json({ message: "Student added successfully" });

  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Student already exists" });
    } else {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};


export const studentLogin = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const student = await Student.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { regno: identifier }
      ]
    });

    if (!student) {
      console.log("Student not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    console.log("Password entered:", password);
    console.log("Hash in DB:", student.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      student: {
        id: student._id,
        name: student.name,
        regno: student.regno,
        email: student.email,
        role: student.role
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getStudentProfile = async (req, res) => {
  try {
    const { regno } = req.params;

    const student = await Student.findOne({ regno });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      student: {
        name: student.name,
        email: student.email,
        regno: student.regno,
        branch: student.branch,
        batch: student.batch,
        role: student.role
      }
    });

  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

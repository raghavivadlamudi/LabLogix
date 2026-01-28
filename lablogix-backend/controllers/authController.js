import bcrypt from "bcryptjs";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
// import Faculty from "../models/Faculty.js";  // add later when you create faculty

export const unifiedLogin = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    let user = null;
    let role = null;

    // 1️⃣ Try ADMIN first (by email only)
    user = await Admin.findOne({ email: identifier.toLowerCase() });
    if (user) {
      role = "admin";
    }

    // 2️⃣ If not admin, try STUDENT (by email OR regno)
    if (!user) {
      user = await Student.findOne({
        $or: [
          { email: identifier.toLowerCase() },
          { regno: identifier }
        ]
      });
      if (user) {
        role = "student";
      }
    }

    // 3️⃣ Later: Try FACULTY (when model exists)
    /*
    if (!user) {
      user = await Faculty.findOne({ email: identifier.toLowerCase() });
      if (user) {
        role = "faculty";
      }
    }
    */

    // 4️⃣ If no user found anywhere
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 5️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 6️⃣ Success response (MATCHES FRONTEND)
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        regno: user.regno, // only exists for students
        role: role
      }
    });

  } catch (err) {
    console.error("UNIFIED LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

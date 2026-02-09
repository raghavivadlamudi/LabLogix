import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Faculty from "./models/Faculty.js";

mongoose.connect(process.env.MONGO_URI);

const createFaculty = async () => {
  const hashedPassword = await bcrypt.hash("faculty123", 10);

  await Faculty.create({
    name: "Faculty One",
    email: "faculty1@lablogix.com",
    password: hashedPassword
  });

  console.log("✅ Faculty created successfully");
  process.exit();
};

createFaculty();

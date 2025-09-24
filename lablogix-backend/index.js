// index.js (existing)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const submissionRoutes = require("./routes/submission");
const adminRoutes = require("./routes/admin"); // <--- add this

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

// MongoDB connection
mongoose.connect("mongodb+srv://vlssanthoshivajjiparthi_db_user:vKcGEpWzi89Jwr1Y@cluster0.y3aocnj.mongodb.net/LabLogix?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/admin", adminRoutes); // <--- add this

// Test route
app.get("/", (req, res) => res.send("Backend is running!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

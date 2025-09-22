import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";

// Pages
import StudentPortal from "./pages/StudentPortal.jsx";
import FacultyPortal from "./pages/FacultyPortal.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome to LabLogix</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/faculty" element={<FacultyPortal />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}

export default App;

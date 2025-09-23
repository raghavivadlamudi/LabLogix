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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentPortal />} />
        <Route path="/faculty-dashboard" element={<FacultyPortal />} />
        <Route path="/admin-dashboard" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StudentPortal from "./pages/StudentPortal.jsx";
import FacultyPortal from "./pages/FacultyPortal.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";
import RegisterStudent from "./pages/RegisterStudent.jsx";
import RegisterFaculty from "./pages/RegisterFaculty.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentPortal />} />
        <Route path="/faculty-dashboard" element={<FacultyPortal />} />
        <Route path="/admin-dashboard" element={<AdminPortal />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-faculty" element={<RegisterFaculty />} />
      </Routes>
    </Router>
  );
}

export default App;

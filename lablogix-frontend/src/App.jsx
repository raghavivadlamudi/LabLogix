import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentPortal from "./pages/StudentPortal";
import FacultyPortal from "./pages/FacultyPortal";
import AdminPortal from "./pages/AdminPortal";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterFaculty from "./pages/RegisterFaculty";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/student-dashboard" element={<StudentPortal />} />
      <Route path="/faculty-dashboard" element={<FacultyPortal />} />
      <Route path="/admin-dashboard" element={<AdminPortal />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      <Route path="/register-faculty" element={<RegisterFaculty />} />
    </Routes>
  );
}

export default App;

import React from "react";
import MainAdminDashboard from "../components/Dashboard/MainAdminDashboard.jsx";
import SubAdminDashboard from "../components/Dashboard/SubAdminDashboard.jsx";
import FacultyDashboard from "../components/Dashboard/FacultyDashboard/FacultyDashboard.jsx";
import StudentDashboard from "../components/Dashboard/StudentDashboard.jsx";

export default function Home() {
  const role = localStorage.getItem("role");

  switch (role) {
    case "main-admin":
      return <MainAdminDashboard />;
    case "sub-admin":
      return <SubAdminDashboard />;
    case "faculty":
      return <FacultyDashboard />;
    case "student":
      return <StudentDashboard />;
    default:
      return <div>Role not found</div>;
  }
}

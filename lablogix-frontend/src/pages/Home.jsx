import React from "react";
import MainAdminDashboard from "../components/Dashboard/MainAdminDashboard";
import SubAdminDashboard from "../components/Dashboard/SubAdminDashboard";
import FacultyDashboard from "../components/Dashboard/FacultyDashboard";
import StudentDashboard from "../components/Dashboard/StudentDashboard";

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

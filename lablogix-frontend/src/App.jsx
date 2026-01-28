// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Layout from "./components/Layout";

import Student from "./pages/Student";
import Faculty from "./pages/Faculty";
import ProgramDetail from "./pages/ProgramDetail";
import AdminDashboard from "./pages/AdminDashboard";

/* -----------------------------------
   Role-based redirect from /home
------------------------------------ */
function RootRedirect() {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/" replace />;
  if (role === "student") return <Navigate to="/student" replace />;
  if (role === "faculty") return <Navigate to="/faculty" replace />;
  if (role === "admin") return <Navigate to="/admin" replace />;

  return <Navigate to="/" replace />;
}

/* -----------------------------------
   Protected Admin Route
------------------------------------ */
function AdminRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

/* -----------------------------------
   App Routes
------------------------------------ */
export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Role-based redirect */}
      <Route path="/home" element={<RootRedirect />} />

      {/* Protected pages with Layout */}
      <Route element={<Layout />}>
        <Route path="/student" element={<Student />} />
        <Route path="/faculty" element={<Faculty />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/program/:id" element={<ProgramDetail />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Student from './pages/Student'
import Faculty from './pages/Faculty'
import Admin from './pages/Admin'
import ProgramDetail from './pages/ProgramDetail'
import Layout from './components/Layout'

function RootRedirect() {
  const role = localStorage.getItem('role')
  if (!role) return <Navigate to="/" replace />
  if (role === 'student') return <Navigate to="/student" replace />
  if (role === 'faculty') return <Navigate to="/faculty" replace />
  if (role === 'admin') return <Navigate to="/admin" replace />
  return <Navigate to="/" replace />
}

export default function App() {
  return (
    <Routes>
      {/* If user goes to root while logged out: show login */}
      <Route path="/" element={<Login />} />

      {/* Helpful: if someone hits /home or /dashboard root, redirect using stored role */}
      <Route path="/home" element={<RootRedirect />} />

      {/* Protected routes wrapped in Layout (navbar) */}
      <Route element={<Layout />}>
        <Route path="/student" element={<Student />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/admin" element={<Admin />} />
      <Route path="/program/:id" element={<ProgramDetail />} />

      </Route>


      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

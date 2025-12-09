// src/components/Navbar.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  const email = localStorage.getItem('email')

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    navigate('/')
  }

  return (
    <nav style={{ background: '#0b6b66', padding: '10px 20px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>LabLogix</Link>
        </div>

        <div>
          {email && <span style={{ marginRight: 12 }}>{email}</span>}
          {role && <span style={{ marginRight: 12, textTransform: 'capitalize' }}>({role})</span>}

          {role === 'student' && <Link to="/student" style={{ color: '#fff', marginRight: 12 }}>Dashboard</Link>}
          {role === 'faculty' && <Link to="/faculty" style={{ color: '#fff', marginRight: 12 }}>Dashboard</Link>}
          {role === 'admin' && <Link to="/admin" style={{ color: '#fff', marginRight: 12 }}>Dashboard</Link>}

          <button onClick={logout} style={{ background: '#fff', color: '#0b6b66', border: 'none', padding: '6px 10px', borderRadius: 4 }}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

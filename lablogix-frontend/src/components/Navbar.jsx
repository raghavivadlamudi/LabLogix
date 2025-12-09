import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <nav style={{ background: '#0b6b66', padding: '10px 20px', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>LMS</Link>
        </div>

        <div>
          {role && <span style={{ marginRight: 15 }}>Role: {role}</span>}
          {role === 'student' && <Link to="/student" style={{ color: '#fff', marginRight: 10 }}>Dashboard</Link>}
          {role === 'faculty' && <Link to="/faculty" style={{ color: '#fff', marginRight: 10 }}>Dashboard</Link>}
          {role === 'admin' && <Link to="/admin" style={{ color: '#fff', marginRight: 10 }}>Dashboard</Link>}
          {role ? <button onClick={logout} style={{ background: '#fff', color: '#0b6b66', border: 'none', padding: '6px 10px', borderRadius: 4 }}>Logout</button> : <Link to="/" style={{ color: '#fff' }}>Login</Link>}
        </div>
      </div>
    </nav>
  )
}

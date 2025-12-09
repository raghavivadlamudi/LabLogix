import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// removed backend api import because you're working frontend-only for now
import users from '../data/users.json'       // static frontend users
import '../styles/SriVishnuLogin.css'
import logo from '../assets/logo.png'
import Vishnu from '../assets/Vishnu.jpg'
import { useLocation } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // If already logged in (role present), redirect immediately
 const location = useLocation()

useEffect(() => {
  // read role once from localStorage (string or null)
  const role = localStorage.getItem('role')
  if (!role) return // nothing to do if not logged in

  // normalize to lowercase path so casing won't cause loops
  const rolePath = `/${role.toLowerCase()}` // e.g. '/student', '/faculty', '/admin'
  const currentPath = (location?.pathname || '').toLowerCase()

  // don't navigate if already on the correct page
  if (currentPath === rolePath) return

  // navigate once; replace to avoid history spam
  navigate(rolePath, { replace: true })
}, [navigate, location])

  const loginLocalUser = (user) => {
  // store minimal session data for client-side routing
  localStorage.setItem('role', user.role)
  localStorage.setItem('email', user.email)
  // navigate to role specific route (lowercase paths)
  if (user.role === 'student') navigate('/student')
  else if (user.role === 'faculty') navigate('/faculty')
  else if (user.role === 'admin') navigate('/admin')
  else navigate('/')
}


  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const emailTrim = email.trim().toLowerCase()

    try {
      // 1) Check static frontend users only (no backend call)
      const localUser = users.find(
        (u) => u.email.toLowerCase() === emailTrim && u.password === password
      )

      if (localUser) {
        // small delay for UX (shows loading)
        setTimeout(() => {
          setLoading(false)
          loginLocalUser(localUser)
        }, 250)
        return
      }

      // 2) If not found locally, show friendly error (no backend)
      setError('Invalid email or password')
    } catch (err) {
      setError('Login failed. Try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-bg" style={{ backgroundImage: `url(${Vishnu})` }} />
      <div className="overlay" />

      <div className="container-box">
        <div className="left-box">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="title">Vishnu Logix</h2>
          <p className="description">LabLogix - "Submit, Evaluate, Celebrate"</p>
        </div>

        <div className="right-box">
          <h3 className="login-title">LOGIN</h3>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="input-box"
              type="email"
              placeholder="Your Email *"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <input
              className="input-box"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'LOGIN'}
            </button>

            {error && <div className="login-error" role="alert">{error}</div>}

            <a className="forgot" href="#forgot">Forgot Password?</a>
          </form>
        </div>
      </div>

      <footer className="footer">Copyrights © 2025, Sri Vishnu Educational Society. All rights reserved.</footer>
    </div>
  )
}

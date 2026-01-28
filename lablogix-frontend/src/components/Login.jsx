import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/SriVishnuLogin.css";
import logo from "../assets/logo.png";
import Vishnu from "../assets/Vishnu.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Auto-redirect if already logged in
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) return;

    const rolePath = `/${role.toLowerCase()}`; // /student, /faculty, /admin
    const currentPath = (location?.pathname || "").toLowerCase();

    if (currentPath === rolePath) return;

    navigate(rolePath, { replace: true });
  }, [navigate, location]);

  // 🔹 MAIN LOGIN HANDLER (COMMON FOR ALL ROLES)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        identifier: email.trim().toLowerCase(), // email OR regno
        password: password
      });

      // ⭐ BACKEND MUST RETURN: { user: {...} }
      const user = res.data.user;

      // Store session
      localStorage.setItem("role", user.role);
      localStorage.setItem("email", user.email);

      if (user.regno) {
        localStorage.setItem("regno", user.regno);
      }

      // Redirect based on role
      if (user.role === "student") {
        navigate("/student");
      } else if (user.role === "faculty") {
        navigate("/faculty");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div
        className="login-bg"
        style={{ backgroundImage: `url(${Vishnu})` }}
      />
      <div className="overlay" />

      <div className="container-box">
        <div className="left-box">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="title">Vishnu Logix</h2>
          <p className="description">
            LabLogix - "Submit, Evaluate, Celebrate"
          </p>
        </div>

        <div className="right-box">
          <h3 className="login-title">LOGIN</h3>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="input-box"
              type="email"
              placeholder="Your Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <input
              className="input-box"
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "LOGIN"}
            </button>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <a className="forgot" href="#forgot">
              Forgot Password?
            </a>
          </form>
        </div>
      </div>

      <footer className="footer">
        Copyrights © 2025, Sri Vishnu Educational Society. All rights reserved.
      </footer>
    </div>
  );
}

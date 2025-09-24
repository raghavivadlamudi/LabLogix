import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // make sure your CSS file is linked

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // student by default
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${role}-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // Save user info & token
        localStorage.setItem("role", role);
        localStorage.setItem(role, JSON.stringify(data));

        // Navigate to appropriate dashboard
        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "faculty") navigate("/faculty-dashboard");
        else if (role === "student") navigate("/student-dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="full-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="input-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

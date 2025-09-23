import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Static users for testing
  const users = [
    { email: "admin1@gmail.com", password: "admin123", role: "admin" },
    { email: "faculty1@gmail.com", password: "faculty123", role: "faculty" },
    { email: "student1@gmail.com", password: "student123", role: "student" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Find user from static array
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Save role in localStorage (optional)
      localStorage.setItem("role", user.role);

      // Navigate based on role
      if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "faculty") navigate("/faculty-dashboard");
      else if (user.role === "student") navigate("/student-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="full-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}

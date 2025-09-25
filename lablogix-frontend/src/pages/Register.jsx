import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // assume role is stored at login
    if (!token || role !== "admin") {
      alert("Access denied. Only admins can register new users.");
      if (role === "faculty") navigate("/faculty-dashboard");
      else if (role === "student") navigate("/student-dashboard");
      else navigate("/"); // not logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Registered successfully!");
      navigate("/admin-dashboard"); // redirect admin back to dashboard
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container">
      <div className="section">
        <h2>Register New User (Admin Only)</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          /><br />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          /><br />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select><br />
          <button type="submit" className="btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

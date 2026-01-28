import { useState } from "react";
import axios from "axios";
import "../styles/dashboards.css";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    regno: "",
    batch: "",
    branch: "",
    email: ""
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
  "http://localhost:5000/api/students/add",
  form
);

      setMsg(res.data.msg);
      setForm({
        name: "",
        regno: "",
        batch: "",
        branch: "",
        email: ""
      });
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="card">
        <h3>Add Student (Manual Entry)</h3>

        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="regno"
            placeholder="Register Number"
            value={form.regno}
            onChange={handleChange}
            required
          />

          <input
            name="batch"
            placeholder="Batch (2022-2026)"
            value={form.batch}
            onChange={handleChange}
            required
          />

          <input
            name="branch"
            placeholder="Branch (CSE / ECE)"
            value={form.branch}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Student"}
          </button>
        </form>

        {msg && <p className="success">{msg}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;

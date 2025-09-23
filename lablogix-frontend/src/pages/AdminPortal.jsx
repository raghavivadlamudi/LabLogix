import { useEffect, useState } from "react";
import axios from "axios";

const AdminPortal = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSubmissions: 0,
  });

  // Fetch statistics from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch statistics");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Admin Portal</h1>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="section">
        <h2>Dashboard Statistics</h2>
        <div className="stats-section">
          <div className="stat-box">
            <h3>Total Students</h3>
            <p>{stats.totalStudents}</p>
          </div>
          <div className="stat-box">
            <h3>Total Submissions</h3>
            <p>{stats.totalSubmissions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;

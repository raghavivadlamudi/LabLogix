import { useEffect, useState } from "react";
import axios from "axios";

const AdminPortal = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalSubmissions: 0 });

  // Fetch statistics from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Portal</h2>
      <p>Dashboard statistics:</p>
      <ul>
        <li>Total Students: {stats.totalStudents}</li>
        <li>Total Submissions: {stats.totalSubmissions}</li>
      </ul>
    </div>
  );
};

export default AdminPortal;

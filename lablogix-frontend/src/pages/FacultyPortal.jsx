import { useEffect, useState } from "react";
import axios from "axios";

const FacultyPortal = () => {
  const [submissions, setSubmissions] = useState([]);

  // Fetch all submissions from backend
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch submissions");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Faculty Portal</h1>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/"; // redirect to login
          }}
        >
          Logout
        </button>
      </div>

      <div className="section">
        <h2>Student Submissions</h2>
        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          <ul className="uploads-list">
            {submissions.map((s) => (
              <li key={s._id}>
                <a
                  href={`http://localhost:5000/${s.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.filePath}
                </a>{" "}
                — Student ID: {s.studentId} — Status:{" "}
                <span
                  className={`status ${
                    s.status === "Completed" ? "completed" : "pending"
                  }`}
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FacultyPortal;

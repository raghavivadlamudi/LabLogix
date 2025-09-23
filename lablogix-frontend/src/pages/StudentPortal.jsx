import { useState, useEffect } from "react";
import axios from "axios";

const StudentPortal = () => {
  const [file, setFile] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [submissions, setSubmissions] = useState([]);

  // Fetch student submissions from backend
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/submissions");
      // Optionally filter by studentId if backend returns all submissions
      setSubmissions(res.data.filter(s => s.studentId === studentId));
    } catch (err) {
      console.error(err);
    }
  };

  // Upload file to backend
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !studentId) return alert("Please provide Student ID and select a file!");

    const formData = new FormData();
    formData.append("labFile", file);
    formData.append("studentId", studentId);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/submissions/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Uploaded successfully: " + res.data.filePath);
      fetchSubmissions(); // Refresh submission list
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [studentId]);

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Student Portal</h1>
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
        <h2>Upload Lab Record</h2>
        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          /><br />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          /><br />
          <button type="submit" className="btn">Upload Lab Record</button>
        </form>
      </div>

      <div className="section">
        <h2>Your Submissions</h2>
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
                — Status:{" "}
                <span
                  className={`status ${
                    s.status === "Completed" ? "completed" : "pending"
                  }`}
                >
                  {s.status}
                </span>{" "}
                — {new Date(s.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentPortal;

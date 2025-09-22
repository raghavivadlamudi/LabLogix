import { useState, useEffect } from "react";
import axios from "axios";

const StudentPortal = () => {
  const [file, setFile] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [submissions, setSubmissions] = useState([]);

  // Upload file to backend
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !studentId) return alert("Please provide Student ID and select a file!");

    const formData = new FormData();
    formData.append("labFile", file);
    formData.append("studentId", studentId);

    try {
      const res = await axios.post("http://localhost:5000/api/submissions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded successfully: " + res.data.filePath);
      fetchSubmissions(); // Refresh submission list
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  // Fetch student submissions from backend
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Portal</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        /><br />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required /><br />
        <button type="submit">Upload Lab Record</button>
      </form>

      <h3 style={{ marginTop: "20px" }}>Your Submissions</h3>
      <ul>
        {submissions.map((s) => (
          <li key={s._id}>
            {s.filePath} — {s.status} — {new Date(s.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentPortal;

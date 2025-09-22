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
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Faculty Portal</h2>
      <p>Click a submission to view/download:</p>
      <ul>
        {submissions.map((s) => (
          <li key={s._id}>
            <a href={`http://localhost:5000/${s.filePath}`} target="_blank" rel="noreferrer">
              {s.filePath}
            </a> — Student ID: {s.studentId} — Status: {s.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyPortal;

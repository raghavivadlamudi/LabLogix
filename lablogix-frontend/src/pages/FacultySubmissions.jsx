// src/pages/FacultySubmissions.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

const FacultySubmissions = () => {
  const { taskId } = useParams();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get(`/faculty/tasks/${taskId}/submissions`)
      .then(res => setSubs(res.data));
  }, [taskId]);

  return (
    <div>
      <h3>Student Submissions</h3>
      {subs.map(s => (
        <div key={s._id}>
          <p>{s.studentId} - {s.status}</p>
          <Link to={`/faculty/evaluate/${s._id}`}>Evaluate</Link>
        </div>
      ))}
    </div>
  );
};

export default FacultySubmissions;

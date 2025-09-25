import React, { useEffect, useState } from "react";
import api from "../../api";

export default function PendingSubmissionsTable() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/submissions/faculty", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data);
    };
    fetchSubmissions();
  }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Student</th>
          <th className="p-2 border">Activity</th>
          <th className="p-2 border">Submission Date</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Grade</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((s) => (
          <tr key={s._id} className={s.status === "late" ? "bg-red-100" : ""}>
            <td className="p-2 border">{s.studentName}</td>
            <td className="p-2 border">{s.activityName}</td>
            <td className="p-2 border">{new Date(s.submissionDate).toLocaleDateString()}</td>
            <td className="p-2 border">{s.status}</td>
            <td className="p-2 border">{s.grade || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

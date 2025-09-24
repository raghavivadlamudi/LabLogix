import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function RegisterStudent() {
  const { department } = useParams(); // Department from URL
  const [mode, setMode] = useState("individual"); // individual or batch
  const [student, setStudent] = useState({ name: "", email: "", year: "I" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleIndividualSubmit = (e) => {
    e.preventDefault();
    const defaultPassword = `Welcome#${new Date().getFullYear()}`;
    console.log("Student Registered:", { ...student, department, password: defaultPassword });
    setMessage(`Student ${student.name} registered successfully with default password: ${defaultPassword}`);
    setStudent({ name: "", email: "", year: "I" });
  };

  const handleBatchUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");
    const defaultPassword = `Welcome#${new Date().getFullYear()}`;
    console.log(`Batch file uploaded for ${department}:`, file.name);
    setMessage(`Batch uploaded successfully! Students assigned default password: ${defaultPassword}`);
    setFile(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register Students - {department} Department</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setMode("individual")}>Individual Registration</button>
        <button onClick={() => setMode("batch")}>Batch Upload</button>
      </div>

      {mode === "individual" && (
        <form onSubmit={handleIndividualSubmit} style={{ maxWidth: "400px" }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              required
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              required
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
            />
          </div>
          <div>
            <label>Year:</label>
            <select
              value={student.year}
              onChange={(e) => setStudent({ ...student, year: e.target.value })}
            >
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>
          <button type="submit">Register Student</button>
        </form>
      )}

      {mode === "batch" && (
        <form onSubmit={handleBatchUpload}>
          <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Upload Batch</button>
        </form>
      )}

      {message && <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function RegisterFaculty() {
  const { department } = useParams();
  const [mode, setMode] = useState("individual");
  const [faculty, setFaculty] = useState({ name: "", email: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleIndividualSubmit = (e) => {
    e.preventDefault();
    const defaultPassword = `Welcome#svecw`;
    console.log("Faculty Registered:", { ...faculty, department, password: defaultPassword });
    setMessage(`Faculty ${faculty.name} registered successfully with default password: ${defaultPassword}`);
    setFaculty({ name: "", email: "" });
  };

  const handleBatchUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");
    const defaultPassword = `Welcome#svecw`;
    console.log(`Batch file uploaded for ${department}:`, file.name);
    setMessage(`Batch uploaded successfully! Faculty assigned default password: ${defaultPassword}`);
    setFile(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register Faculty - {department} Department</h2>

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
              value={faculty.name}
              onChange={(e) => setFaculty({ ...faculty, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              required
              value={faculty.email}
              onChange={(e) => setFaculty({ ...faculty, email: e.target.value })}
            />
          </div>
          <button type="submit">Register Faculty</button>
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

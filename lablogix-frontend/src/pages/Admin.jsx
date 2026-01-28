import React, { useEffect, useState } from "react";
import axios from "axios";
import usersJson from "../data/users.json";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // existing mock users logic
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("mock_users") || "null");
    if (local) setUsers(local);
    else {
      localStorage.setItem("mock_users", JSON.stringify(usersJson));
      setUsers(usersJson);
    }
  }, []);

  const updateRole = (email, newRole) => {
    const updated = users.map((u) =>
      u.email === email ? { ...u, role: newRole } : u
    );
    setUsers(updated);
    localStorage.setItem("mock_users", JSON.stringify(updated));
  };

  const deleteUser = (email) => {
    if (!window.confirm("Delete user " + email + "?")) return;
    const updated = users.filter((u) => u.email !== email);
    setUsers(updated);
    localStorage.setItem("mock_users", JSON.stringify(updated));
  };

  // 🔴 NEW: Upload handler
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // MUST be "file"

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/upload-students",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(
        `Upload completed: ${res.data.inserted} inserted, ${res.data.skipped} skipped`
      );
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* 🔴 STUDENT UPLOAD SECTION */}
      <h2>Upload Students (Excel)</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button type="submit" style={{ marginTop: 8 }}>
          Upload
        </button>
      </form>
      <p>{message}</p>

      <hr />

      {/* EXISTING USER MANAGEMENT */}
      <p>Manage users (changes stored in browser storage)</p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th style={{ padding: 8 }}>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={{ padding: 8 }}>{u.name || "-"}</td>
              <td>{u.email}</td>
              <td style={{ textTransform: "capitalize" }}>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.email, e.target.value)}
                >
                  <option value="student">student</option>
                  <option value="faculty">faculty</option>
                  <option value="admin">admin</option>
                </select>
                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => deleteUser(u.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

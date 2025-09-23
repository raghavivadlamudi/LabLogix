import React, { useEffect, useState } from "react";

export default function AdminPortal() {
  const [adminData, setAdminData] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Simulate fetching admin info from localStorage or static data
    const token = JSON.parse(localStorage.getItem("admin")) || {
      id: "A101",
      name: "Admin One",
      role: "main", // or "sub"
      department: "CSE" // only for sub admin
    };
    setAdminData(token);

    // Define all departments
    const allDepartments = ["CSE", "AI", "IT", "ECE", "EEE", "MECH", "CIVIL"];

    if (token.role === "main") {
      setDepartments(allDepartments);
    } else if (token.role === "sub") {
      setDepartments([token.department]);
    }
  }, []);

  if (!adminData) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Portal</h2>

      <div style={{ marginBottom: "2rem", background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
        <p><strong>Name:</strong> {adminData.name}</p>
        <p><strong>ID:</strong> {adminData.id}</p>
        <p><strong>Role:</strong> {adminData.role === "main" ? "Main Admin" : "Sub Admin"}</p>
      </div>

      <div>
        <h3>Accessible Departments</h3>
        <ul>
          {departments.map((dept, idx) => (
            <li key={idx}>{dept}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

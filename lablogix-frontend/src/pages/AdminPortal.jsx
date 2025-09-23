import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPortal() {
  const [adminData, setAdminData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("admin")) || {
      id: "A101",
      name: "Admin One",
      role: "main", 
      department: "CSE" 
    };
    setAdminData(token);

    const allDepartments = ["CSE", "AI", "IT", "ECE", "EEE", "MECH", "CIVIL"];
    if (token.role === "main") setDepartments(allDepartments);
    else if (token.role === "sub") setDepartments([token.department]);
  }, []);

  if (!adminData) return <p>Loading...</p>;

  // Dummy student count, later can fetch from API
  const studentCount = {
    CSE: 120,
    AI: 60,
    IT: 80,
    ECE: 90,
    EEE: 70,
    MECH: 50,
    CIVIL: 40
  };

  const years = ["I", "II", "III", "IV"]; // Roman numerals

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Portal</h2>

      <div style={{ marginBottom: "2rem", background: "#f5f5f5", padding: "1rem", borderRadius: "8px" }}>
        <p><strong>Name:</strong> {adminData.name}</p>
        <p><strong>ID:</strong> {adminData.id}</p>
        <p><strong>Role:</strong> {adminData.role === "main" ? "Main Admin" : "Sub Admin"}</p>
      </div>

      <div>
        <h3>Departments</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
          {departments.map((dept) => (
            <button
              key={dept}
              style={{ padding: "10px 20px", borderRadius: "6px", cursor: "pointer", background: "#ff4757", color: "#fff", border: "none" }}
              onClick={() => setSelectedDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {selectedDept && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{selectedDept} Department</h3>
          <p><strong>Total Students:</strong> {studentCount[selectedDept]}</p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "15px 0" }}>
            {years.map((year) => (
              <button
                key={year}
                style={{ padding: "10px 15px", borderRadius: "6px", cursor: "pointer", background: "#1cc88a", color: "#fff", border: "none" }}
                onClick={() => navigate(`/department/${selectedDept}/year/${year}`)}
              >
                Year {year}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              style={{ padding: "10px 20px", borderRadius: "6px", cursor: "pointer", background: "#ff4757", color: "#fff", border: "none" }}
              onClick={() => navigate(`/register-student/${selectedDept}`)}
            >
              Register Students
            </button>
            <button
              style={{ padding: "10px 20px", borderRadius: "6px", cursor: "pointer", background: "#646cff", color: "#fff", border: "none" }}
              onClick={() => navigate(`/register-faculty/${selectedDept}`)}
            >
              Register Faculty
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

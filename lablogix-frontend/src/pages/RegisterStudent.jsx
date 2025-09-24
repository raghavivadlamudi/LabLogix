import React, { useState } from "react";

export default function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    section: "",
    yearOfJoining: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/register-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) setMessage("Student registered successfully!");
      else setMessage(data.message || "Error registering student");
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="form-container">
      <h2>Register Student</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="email" placeholder="Email" type="email" required onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" required onChange={handleChange} />
        <input name="department" placeholder="Department" required onChange={handleChange} />
        <input name="section" placeholder="Section" required onChange={handleChange} />
        <input name="yearOfJoining" placeholder="Year of Joining" required onChange={handleChange} />
        <button type="submit">Register Student</button>
      </form>
    </div>
  );
}

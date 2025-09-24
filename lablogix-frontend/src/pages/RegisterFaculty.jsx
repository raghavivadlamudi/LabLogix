import React, { useState } from "react";

export default function RegisterFaculty() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/register-faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) setMessage("Faculty registered successfully!");
      else setMessage(data.message || "Error registering faculty");
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="form-container">
      <h2>Register Faculty</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="email" placeholder="Email" type="email" required onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" required onChange={handleChange} />
        <input name="department" placeholder="Department" required onChange={handleChange} />
        <button type="submit">Register Faculty</button>
      </form>
    </div>
  );
}

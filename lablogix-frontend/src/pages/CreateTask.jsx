// src/pages/CreateTask.jsx
import { useState } from "react";
import api from "../api";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    subject: "",
    className: "",
    description: "",
    dueDate: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/faculty/tasks", task);
    alert("Task Created");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Task</h3>
      <input placeholder="Title" onChange={e => setTask({...task, title:e.target.value})}/>
      <input placeholder="Subject" onChange={e => setTask({...task, subject:e.target.value})}/>
      <input placeholder="Class" onChange={e => setTask({...task, className:e.target.value})}/>
      <textarea placeholder="Description" onChange={e => setTask({...task, description:e.target.value})}/>
      <input type="date" onChange={e => setTask({...task, dueDate:e.target.value})}/>
      <button type="submit">Save</button>
    </form>
  );
};

export default CreateTask;

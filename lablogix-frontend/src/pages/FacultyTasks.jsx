// src/pages/FacultyTasks.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const FacultyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/faculty/tasks").then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h3>My Tasks</h3>
      {tasks.map(task => (
        <div key={task._id}>
          <p>{task.title} - {task.subject}</p>
          <Link to={`/faculty/tasks/${task._id}`}>View Submissions</Link>
        </div>
      ))}
    </div>
  );
};

export default FacultyTasks;

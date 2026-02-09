// src/pages/FacultyDashboard.jsx
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  return (
    <div>
      <h2>Faculty Dashboard</h2>
      <Link to="/faculty/create-task">Create Task</Link><br/>
      <Link to="/faculty/tasks">View Tasks</Link>
    </div>
  );
};

export default FacultyDashboard;

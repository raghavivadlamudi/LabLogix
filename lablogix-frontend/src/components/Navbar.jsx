import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/student" style={{ marginRight: "15px" }}>Student</Link>
      <Link to="/faculty" style={{ marginRight: "15px" }}>Faculty</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
};

export default Navbar;

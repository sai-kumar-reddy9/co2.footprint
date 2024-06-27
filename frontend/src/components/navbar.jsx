import React from "react";
import { Link } from "react-router-dom";
import './App.css';  // Make sure the path is correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CO2 Travel Planner</div>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <span className="separator">/</span>
        <Link to="/register">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/app.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">CO2 Travel Planner</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <span className="separator">/</span>
            <Link to="/register">Sign Up</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/CO2CalculationPage">Calculate CO2</Link>
            <Link to="/CO2Estimationpage">Estimate CO2</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}
        <Link to="/about">About</Link>
        {isAuthenticated &&(
          <Link to="/logout">Logout</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './app.css';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="logo">CO2 Footprint Travel Planner</h1>
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/co2EstiPage">CO2 Estimation</Link>
          <Link to="/co2Calpage">CO2 Calculation</Link>
        </div>
      </nav>
      <header className="hero-section">
        <h2>Welcome to Your CO2 Footprint Dashboard</h2>
        <p>Track and reduce your carbon footprint with our tools and insights.</p>
      </header>
      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features">
          <div className="feature">
            <h3>CO2 Emissions Estimator</h3>
            <p>Calculate the transportation emissions for your trip.</p>
          </div>
          <div className="feature">
            <h3>Personal CO2 Calculator</h3>
            <p>Track your daily and yearly carbon footprint.</p>
          </div>
          <div className="feature">
            <h3>CO2 Dashboard</h3>
            <p>View detailed breakdowns of your carbon emissions by category.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2023 CO2 Footprint Travel Planner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

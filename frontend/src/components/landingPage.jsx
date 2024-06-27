import React from "react";
import Navbar from "./navbar";
import './App.css';  // Make sure the path is correct

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <section className="home-intro">
        <h1>Welcome to the CO2 Travel Planner</h1>
        <p>
          Our website helps you calculate and reduce your carbon footprint when
          traveling. Learn more about sustainable travel and how you can make a
          difference.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;

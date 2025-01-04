// // src/pages/LandingPage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './app.css';

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  console.log('user:',user);

  return (
    <div className="landing-page">
      <div className="hero-section">
        <h2>Welcome {user ? user.username : 'to Our CO2 Footprint Tracker'}</h2>
        <p>Track and reduce your carbon footprint with our user-friendly tools.</p>
      </div>

      <div className="features-section">
        <h2>Features</h2>

        <div className="feature">
          <img src="household.png" alt="Feature 1" />
          <div className="feature-content">
            <h3>Household Emission Calculations</h3>
            <p>Calculate emissions from various household activities, helping you track and manage your overall carbon footprint effectively.</p>
          </div>
        </div>

        <div className="feature">
          <img src="travel.jpg" alt="Feature 2" />
          <div className="feature-content">
            <h3>Travel Emission Estimation</h3>
            <p>Estimate carbon emissions from flights, cars, and motorbikes with high accuracy using the Carbon Interface API and reliable data sources.</p>
          </div>
        </div>

        <div className="feature">
          <img src="Dashboard.png" alt="Feature 3" />
          <div className="feature-content">
            <h3>Interactive Dashboard</h3>
            <p>Visualize your emissions over time and across different activities with our comprehensive and interactive dashboard.</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 CO2 Footprint Tracker. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;


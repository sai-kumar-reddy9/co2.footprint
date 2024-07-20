import React from 'react';
import './app.css';

const About = () => {
  return (
    <div className="about-page">
      <h1>About CO2 Travel Footprint</h1>
      
      <section className="about-section mission-section">
        <div className="about-mission">
          <h2>Our Mission</h2>
          <p>
            The "CO2 Travel Footprint" application aims to empower individuals with the knowledge and tools to understand and reduce their carbon emissions. By providing accurate and user-friendly estimation tools, we help users make informed decisions about their travel and household activities, contributing to a more sustainable future.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Travel Emission Estimation:</strong> Estimate carbon emissions from flights, cars, and motorbikes. Our car and flight calculations use the Carbon Interface API, ensuring high accuracy. Bike emissions are calculated manually based on reliable data.
          </li>
          <li>
            <strong>Household Emission Calculations:</strong> Calculate emissions from various household activities, including electricity, LPG, and coal usage, helping users track and manage their overall carbon footprint.
          </li>
          <li>
            <strong>Interactive Dashboard:</strong> Visualize your emissions over time and across different activities. The dashboard provides insights into your carbon footprint, helping you identify areas for improvement.
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h2>How It Works</h2>
        <p>
          Our application uses advanced APIs and reliable data sources to provide accurate emission estimates:
        </p>
        <ul>
          <li>
            <strong>Carbon Interface API:</strong> For car and flight emission calculations, we use the Carbon Interface API, which provides up-to-date and precise emission factors.
          </li>
          <li>
            <strong>Manual Calculations:</strong> For motorbikes, we use industry-standard emission factors. Small, medium, and large motorbikes have specific CO2 emission rates per kilometer.
          </li>
          <li>
            <strong>Household Emissions:</strong> Emission factors for electricity, LPG, and coal are based on standard data, ensuring comprehensive coverage of common household emission sources.
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Security and Privacy</h2>
        <p>
          We prioritize the security and privacy of our users. All data is securely stored and protected. Our application uses authentication and protected routes to ensure that only authorized users can access sensitive information.
        </p>
      </section>

      <section className="about-section">
        <h2>Get Involved</h2>
        <p>
          Join us in our mission to reduce carbon emissions. Whether you’re an individual looking to track your footprint or an organization interested in partnering with us, we welcome your involvement. Contact us for more information.
        </p>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? Reach out to us at:
        </p>
        <ul>
          <li>Email: support@co2footprint.com</li>
          <li>Phone: +123-456-7890</li>
          <li>Address: Hyderabad</li>
        </ul>
      </section>
    </div>
  );
};

export default About;

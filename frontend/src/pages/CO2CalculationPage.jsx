import React, { useState } from 'react';
import './app.css';

const CO2CalculationPage = () => {
  const [electricityUsage, setElectricityUsage] = useState('');
  const [lpgUsage, setLpgUsage] = useState('');
  const [coalUsage, setCoalUsage] = useState('');
  const [totalCO2Kg, setTotalCO2Kg] = useState(null);
  const [totalCO2Mt, setTotalCO2Mt] = useState(null);

  const handleElectricityChange = (e) => {
    setElectricityUsage(e.target.value);
  };

  const handleLpgChange = (e) => {
    setLpgUsage(e.target.value);
  };

  const handleCoalChange = (e) => {
    setCoalUsage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const co2PerKwhElectricity = 0.92; // kg CO2 per kWh
    const co2PerKgLpg = 2.9; // kg CO2 per kg of LPG
    const co2PerKgCoal = 2.44; // kg CO2 per kg of coal

    const totalElectricityCO2 = electricityUsage * co2PerKwhElectricity;
    const totalLpgCO2 = lpgUsage * co2PerKgLpg;
    const totalCoalCO2 = coalUsage * co2PerKgCoal;

    const totalCO2Kg = (
      totalElectricityCO2 + totalLpgCO2 + totalCoalCO2
    ).toFixed(2); // in kg

    const totalCO2Mt = (totalCO2Kg / 1000).toFixed(2); // in metric tons

    setTotalCO2Kg(totalCO2Kg);
    setTotalCO2Mt(totalCO2Mt);
  };

  return (
    <div className="co2-calculation-page">
      <div className="container">
        <h2>Household CO2 Calculator</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="electricity">Electricity Usage (kWh):</label>
            <input
              type="number"
              id="electricity"
              value={electricityUsage}
              onChange={handleElectricityChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lpg">LPG Usage (kg):</label>
            <input
              type="number"
              id="lpg"
              value={lpgUsage}
              onChange={handleLpgChange}
              required
            />
          </div>
          <div>
            <label htmlFor="coal">Coal Usage (kg):</label>
            <input
              type="number"
              id="coal"
              value={coalUsage}
              onChange={handleCoalChange}
              required
            />
          </div>
          <button type="submit">Calculate</button>
        </form>
        {totalCO2Kg !== null && (
          <div className="result">
            <div className="kg-result">
              <h3>Total Household CO2 Footprint = {totalCO2Kg} kg of CO2</h3>
            </div>
            <div className="mt-result">
              <h3>Total Household CO2 Footprint = {totalCO2Mt} metric tons of CO2</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CO2CalculationPage;

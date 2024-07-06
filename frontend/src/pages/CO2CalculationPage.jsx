import React, { useState } from 'react';

const CO2CalculationPage = () => {
  const [electricityUsage, setElectricityUsage] = useState('');
  const [lpgUsage, setLpgUsage] = useState('');
  const [coalUsage, setCoalUsage] = useState('');
  const [totalCO2, setTotalCO2] = useState(null);

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

    const totalCO2 = (
      totalElectricityCO2 + totalLpgCO2 + totalCoalCO2
    ).toFixed(2); // in kg

    setTotalCO2(totalCO2);
  };

  return (
    <div>
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
      {totalCO2 !== null && (
        <div>
          <h3>Total Household CO2 Footprint = {totalCO2} kg of CO2</h3>
        </div>
      )}
    </div>
  );
};

export default CO2CalculationPage;

// src/pages/CO2EstimationPage.jsx
import React, { useState, useEffect } from 'react';
import { getVehicleMakes, getVehicleModels, getCarbonEmissions } from './carbonApi';
import './app.css';

const CO2EstimationPage = () => {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [distance, setDistance] = useState('');
  const [unit, setUnit] = useState('km');
  const [emissions, setEmissions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      try {
        const data = await getVehicleMakes();
        setVehicleMakes(data);
      } catch (error) {
        console.error('Failed to fetch vehicle makes:', error);
      }
    };

    fetchVehicleMakes();
  }, []);

  const handleMakeChange = async (event) => {
    const makeId = event.target.value;
    setSelectedMake(makeId);
    try {
      const data = await getVehicleModels(makeId);
      setVehicleModels(data);
      setSelectedModel(''); // Reset selected model when make changes
    } catch (error) {
      console.error('Failed to fetch vehicle models:', error);
    }
  };

  const handleCalculate = async () => {
    setError(null);
    setEmissions(null);
    
    try {
      const data = await getCarbonEmissions(selectedModel, parseFloat(distance), unit);
      setEmissions(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="co2-estimation-page">
      <h1>CO2 Estimation Page</h1>
      <div className="input-group">
        <select value={selectedMake} onChange={handleMakeChange}>
          <option value="">Select Vehicle Make</option>
          {vehicleMakes.map((make) => (
            <option key={make.data.id} value={make.data.id}>
              {make.data.attributes.name}
            </option>
          ))}
        </select>
        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedMake}>
          <option value="">Select Vehicle Model</option>
          {vehicleModels.map((model) => (
            <option key={model.data.id} value={model.data.id}>
              {model.data.attributes.name} ({model.data.attributes.year})
            </option>
          ))}
        </select>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Distance"
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="km">Kilometers</option>
          <option value="mi">Miles</option>
        </select>
        <button onClick={handleCalculate}>Calculate</button>
      </div>
      {emissions && (
        <div className="emissions-result">
          <h2>Emissions Result</h2>
          <div className="emission-details">
            <div><i className="fas fa-tachometer-alt"></i> Distance: {emissions.data.attributes.distance_value} {emissions.data.attributes.distance_unit}</div>
            {/* <div><i className="fas fa-car"></i> Vehicle Make: {emissions.data.attributes.vehicle_make}</div> */}
            <div><i className="fas fa-car-side"></i> Vehicle Model: {emissions.data.attributes.vehicle_model}</div>
            {/* <div><i className="fas fa-calendar-alt"></i> Vehicle Year: {emissions.data.attributes.vehicle_year}</div> */}
            <div><i className="fas fa-cloud"></i> Carbon Emissions (g): {emissions.data.attributes.carbon_g}</div>
            <div><i className="fas fa-weight"></i> Carbon Emissions (lb): {emissions.data.attributes.carbon_lb}</div>
            <div><i className="fas fa-balance-scale"></i> Carbon Emissions (kg): {emissions.data.attributes.carbon_kg}</div>
            <div><i className="fas fa-globe"></i> Carbon Emissions (mt): {emissions.data.attributes.carbon_mt}</div>
          </div>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default CO2EstimationPage;

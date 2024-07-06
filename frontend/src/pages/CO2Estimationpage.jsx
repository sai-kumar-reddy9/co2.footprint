//src/pages/CO2Estimationpage
import React, { useState, useEffect } from 'react';
import { getVehicleMakes, getVehicleModels, getCarbonEmissions, getFlightCarbonEmissions } from './carbonApi';
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
  const [selectedSection, setSelectedSection] = useState(''); // '' for no section, 'vehicle' for vehicle section, 'flight' for flight section, 'bike' for bike section

  // Flight state
  const [departureAirport, setDepartureAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [passengers, setPassengers] = useState('');

  // Bike state
  const [bikeMileage, setBikeMileage] = useState('');
  const [bikeType, setBikeType] = useState('');

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

  const handleCalculateVehicle = async () => {
    setError(null);
    setEmissions(null);

    try {
      const data = await getCarbonEmissions(selectedModel, parseFloat(distance), unit);
      setEmissions(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCalculateFlight = async () => {
    setError(null);
    setEmissions(null);

    try {
      const legs = [
        { departure_airport: departureAirport, destination_airport: destinationAirport }
      ];

      const data = await getFlightCarbonEmissions(legs, parseInt(passengers), unit);
      setEmissions(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCalculateBike = () => {
    setError(null);
    setEmissions(null);

    let co2PerKm;

    switch (bikeType) {
      case 'small':
        co2PerKm = 0.055; // kg CO2 per km for small motorbike
        break;
      case 'medium':
        co2PerKm = 0.095; // kg CO2 per km for medium motorbike
        break;
      case 'large':
        co2PerKm = 0.121; // kg CO2 per km for large motorbike
        break;
      default:
        co2PerKm = 0;
        break;
    }

    const totalCO2 = (bikeMileage * co2PerKm).toFixed(2); // in kg
    const totalCO2MetricTons = (totalCO2 / 1000).toFixed(2); // convert to metric tons

    setEmissions({ data: { attributes: { carbon_kg: totalCO2, carbon_mt: totalCO2MetricTons, distance_value: bikeMileage, distance_unit: unit, vehicle_model: bikeType } } });
  };

  return (
    <div className="co2-estimation-page">
      <h1>CO2 Estimation Page</h1>

      <div className="symbol-selection">
        <i className="fas fa-car" onClick={() => setSelectedSection('vehicle')} style={{ fontSize: '2rem', cursor: 'pointer', margin: '1rem' }}></i>
        <i className="fas fa-plane" onClick={() => setSelectedSection('flight')} style={{ fontSize: '2rem', cursor: 'pointer', margin: '1rem' }}></i>
        <i className="fas fa-motorcycle" onClick={() => setSelectedSection('bike')} style={{ fontSize: '2rem', cursor: 'pointer', margin: '1rem' }}></i>
      </div>

      {selectedSection === 'vehicle' && (
        <div className="estimation-section">
          <h2>Vehicle CO2 Estimation</h2>
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
            <button onClick={handleCalculateVehicle}>Calculate</button>
          </div>
        </div>
      )}

      {selectedSection === 'flight' && (
        <div className="estimation-section">
          <h2>Flight CO2 Estimation</h2>
          <h5>(use IATA code of the Airports)</h5>
          <div className="input-group">
            <input
              type="text"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              placeholder="Departure Airport"
            />
            <input
              type="text"
              value={destinationAirport}
              onChange={(e) => setDestinationAirport(e.target.value)}
              placeholder="Destination Airport"
            />
            <input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              placeholder="Number of Passengers"
            />
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="km">Kilometers</option>
              <option value="mi">Miles</option>
            </select>
            <button onClick={handleCalculateFlight}>Calculate</button>
          </div>
        </div>
      )}

      {selectedSection === 'bike' && (
        <div className="estimation-section">
          <h2>Bike CO2 Estimation</h2>
          <div className="input-group">
            <input
              type="number"
              value={bikeMileage}
              onChange={(e) => setBikeMileage(e.target.value)}
              placeholder="Mileage"
            />
            <select value={bikeType} onChange={(e) => setBikeType(e.target.value)}>
              <option value="">- select type -</option>
              <option value="small">small motorbike/moped/scooter up to 125cc</option>
              <option value="medium">medium motorbike over 125cc and up to 500cc</option>
              <option value="large">large motorbike over 500cc</option>
            </select>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="km">Kilometers</option>
              <option value="mi">Miles</option>
            </select>
            <button onClick={handleCalculateBike}>Calculate</button>
          </div>
        </div>
      )}

      {/* Display Emissions Results or Errors */}
      {emissions && (
        <div className="emissions-result">
          <h2>Emissions Result</h2>
          <div className="emission-details">
            <div><i className="fas fa-tachometer-alt"></i> Distance: {emissions.data.attributes.distance_value} {emissions.data.attributes.distance_unit}</div>
            {/* Vehicle details */}
            {emissions.data.attributes.vehicle_model && (
              <div><i className="fas fa-car-side"></i> Vehicle Model: {emissions.data.attributes.vehicle_model}</div>
            )}
            {emissions.data.attributes.vehicle_year && (
              <div><i className="fas fa-calendar-alt"></i> Vehicle Year: {emissions.data.attributes.vehicle_year}</div>
            )}
            {/* Flight details */}
            {emissions.data.attributes.legs && (
              <div>
                <i className="fas fa-plane"></i> Flight Details:
                {emissions.data.attributes.legs.map((leg, index) => (
                  <div key={index}>
                    <div>Leg {index + 1}: {leg.departure_airport} to {leg.destination_airport}</div>
                  </div>
                ))}
              </div>
            )}
            {/* Emission details */}
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

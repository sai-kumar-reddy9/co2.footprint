// src/pages/carbonApi.jsx
import axios from 'axios';

const API_KEY = 'qeWdMY3hKWiBIOszfZmmw'; //Carbon Interface API key

// Function to fetch vehicle makes
export const getVehicleMakes = async () => {
  try {
    const response = await axios.get('https://www.carboninterface.com/api/v1/vehicle_makes', {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle makes:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to fetch vehicle models for a selected make
export const getVehicleModels = async (makeId) => {
  try {
    const response = await axios.get(`https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle models:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to estimate CO2 emissions for vehicles
export const getCarbonEmissions = async (vehicleModelId, distance, distanceUnit) => {
  try {
    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', {
      type: 'vehicle',
      distance_unit: distanceUnit,
      distance_value: distance,
      vehicle_model_id: vehicleModelId,
    }, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error estimating carbon emissions:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to estimate CO2 emissions for flights
export const getFlightCarbonEmissions = async (legs, passengers, distanceUnit) => {
  try {
    const response = await axios.post('https://www.carboninterface.com/api/v1/estimates', {
      type: 'flight',
      passengers,
      legs,
      distance_unit: distanceUnit,
    }, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error estimating flight carbon emissions:', error.response ? error.response.data : error.message);
    throw error;
  }
};

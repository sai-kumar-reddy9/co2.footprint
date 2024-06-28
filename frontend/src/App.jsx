import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login.jsx';
import RegisterForm from './components/register.jsx';
import LandingPage from './components/landingPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/home.jsx';
import Dashboard from './pages/dashboard.jsx';
import CO2EstimationPage from './pages/co2EstiPage.jsx';
import CO2CalculationPage from './pages/co2CalPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/co2EstiPage"
          element={
            <ProtectedRoute>
              <CO2EstimationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/co2CalPage"
          element={
            <ProtectedRoute>
              <CO2CalculationPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

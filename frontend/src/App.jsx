// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login.jsx'
import RegisterForm from './components/register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/dashboard.jsx';
import CO2EstimationPage from './pages/co2EstiPage.jsx';
import CO2CalculationPage from './pages/co2CalPage.jsx';
import Navbar from './components/navbar.jsx';
import About from './pages/about.jsx';
import LogoutButton from './components/logout.jsx';
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/about" element={<About />} />
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
         <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <LogoutButton />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

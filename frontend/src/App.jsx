// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginForm from './components/login.jsx'
import RegisterForm from './components/register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/dashboard.jsx';
import CO2EstimationPage from './pages/CO2Estimationpage.jsx';
import CO2CalculationPage from './pages/CO2CalculationPage.jsx';
import Navbar from './components/navbar.jsx';
import About from './pages/about.jsx';
import LogoutButton from './components/logout.jsx';
const App = () => {
  return (
    <AuthProvider>
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
          path="/CO2Estimationpage"
          element={
            <ProtectedRoute>
              <CO2EstimationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CO2CalculationPage"
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
    </AuthProvider>
  );
};

export default App;

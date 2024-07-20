import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const isAuthenticated = !!user; // Check if user is authenticated

  console.log('User from context:', user); // Debug statement

  return isAuthenticated ? (
    children
  ) : (
    <Navigate 
      to="/login" 
      replace 
      state={{ from: window.location.pathname }} // Pass the current path for redirection after login
    />
  );
};

export default ProtectedRoute;

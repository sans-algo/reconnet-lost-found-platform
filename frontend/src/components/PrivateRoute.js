import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Component to protect routes (only logged-in users can access)
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  // If not logged in, redirect to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
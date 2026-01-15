import React, { createContext, useState, useEffect } from 'react';
import {
  registerUser,
  loginUser,
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  clearUserFromLocalStorage
} from '../services/authService';

// Create context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const userData = getUserFromLocalStorage();
    
    if (userData) {
      setUser(userData.user);
    }
    setLoading(false);
  }, []);

  // Register function
  const register = async (userData) => {
    const result = await registerUser(userData);
    
    if (result.success) {
      saveUserToLocalStorage(result.data);
      setUser(result.data);
    }
    
    return result;
  };

  // Login function
  const login = async (credentials) => {
    const result = await loginUser(credentials);
    
    if (result.success) {
      saveUserToLocalStorage(result.data);
      setUser(result.data);
    }
    
    return result;
  };

  // Logout function
  const logout = () => {
    clearUserFromLocalStorage();
    setUser(null);
  };

  // Value passed to all components
  const value = {
    user,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
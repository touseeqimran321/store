// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const signup = async ({ username, email, password }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://b900-2400-adc5-453-1500-a1d4-4470-86a4-b539.ngrok-free.app/api/signup', { username, email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://b900-2400-adc5-453-1500-a1d4-4470-86a4-b539.ngrok-free.app/api/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

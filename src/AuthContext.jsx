// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('https://33b5-2400-adc5-453-1500-20b2-db3e-92c6-6d1f.ngrok-free.app/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching data');
      }
    };

    fetchData();
  }, []);

  const signup = async ({ username, email, password }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://33b5-2400-adc5-453-1500-20b2-db3e-92c6-6d1f.ngrok-free.app/api/signup', { username, email, password });
      setUser(response.data.user);
      const { token } = response.data;
      localStorage.setItem('token', token);
      alert('Signup successful! Welcome aboard!');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        setError('An error occurred while processing your request.');
        alert('An error occurred while processing your request.');
      }
    }
    setIsLoading(false);
  };
  
  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://33b5-2400-adc5-453-1500-20b2-db3e-92c6-6d1f.ngrok-free.app/api/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      alert('Login successful! Welcome back!');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        alert(`Error: ${error.response.data.message}`);
      } else {
        setError('An error occurred while processing your request.');
        alert('An error occurred while processing your request.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logout successful! Goodbye!');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signup, login, logout }}>
      <ParentComponent>
        {children}
      </ParentComponent>
    </AuthContext.Provider>
  );
};

const ParentComponent = ({ children }) => {
  // Add any additional logic or styling here
  return (
    <div>
      {children}
    </div>
  );
};

export default AuthContext;

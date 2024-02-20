import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/get', {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'avoid',
          },
        });
        console.log(response.data,'28777777777777777777777777777777777');
        setUser(response.data);
        setIsAuthenticated(true); // Set authentication status based on successful user retrieval
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching data');
        setIsAuthenticated(false); // Ensure authentication status is set to false on error
      } finally {
        setIsLoading(false); // Ensure loading state is set to false regardless of outcome
      }
    };

    fetchData();
  }, []);

  const signup = async ({ username, email, password }) => {
  setIsLoading(true);
  try {
    const userExistsResponse = await checkUserExists(email);
    if (userExistsResponse.exists) {
      throw new Error('User already exists');
    }

    const response = await axios.post('https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/signup', { username, email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true); // Set isAuthenticated to true after successful signup
  } catch (error) {
    setError(error.response?.data?.message || 'An error occurred while processing your request.');
  } finally {
    setIsLoading(false);
  }
};

const login = async ({ email, password }) => {
  setIsLoading(true);
  try {
    const response = await axios.post('https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true); // Set isAuthenticated to true after successful login
  } catch (error) {
    setError(error.response?.data?.message || 'An error occurred while processing your request.');
  } finally {
    setIsLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false); // Set authentication status to false on logout
    alert('Logout successful! Goodbye!');
  };

  const checkUserExists = async (email) => {
    try {
      const response = await axios.post('https://a714-2400-adc5-453-1500-60e3-4d57-bdbb-a819.ngrok-free.app/api/checkUser', { email });
      return { exists: response.data.exists };
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return { exists: false };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

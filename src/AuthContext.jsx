import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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

        const response = await axios.get('https://b437-2400-adc5-453-1500-15bb-ce97-5be3-96cd.ngrok-free.app/api/user', {
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
      // Check if the user already exists
      const userExistsResponse = await checkUserExists(email);
      if (userExistsResponse.exists) {
        throw new Error('User already exists');
      }

      const response = await axios.post('https://b437-2400-adc5-453-1500-15bb-ce97-5be3-96cd.ngrok-free.app/api/signup', { username, email, password });
      setUser(response.data.user);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while processing your request.');
      }
    }
    setIsLoading(false);
  };

  const login = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://b437-2400-adc5-453-1500-15bb-ce97-5be3-96cd.ngrok-free.app/api/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while processing your request.');
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

  const checkUserExists = async (email) => {
    try {
      const response = await axios.post('https://f15f-111-88-233-53.ngrok-free.app/api/checkUser', { email });
      return { exists: response.data.exists };
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return { exists: false };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, error, signup, login, logout }}>
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

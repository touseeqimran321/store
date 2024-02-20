import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State for loading animation

  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/List');
  };

  return (
    <div>
      {loading ? ( // Show full-page loading animation if loading is true
        <div className="full-page-loader">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="profile-content">
          {user ? (
            <div className="user-details">
              <h2>User Profile</h2>
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {/* Add more user details here */}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <p className="no-user">No user logged in.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

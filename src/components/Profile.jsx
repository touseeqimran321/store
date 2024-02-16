import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const { user } = useAuth(); // Access the user object from the AuthContext
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://b900-2400-adc5-453-1500-a1d4-4470-86a4-b539.ngrok-free.app/api/user/${user.id}`);
        setProfileUser(response.data);
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  return (
    <div>
      {error && <p>{error}</p>}
      {profileUser && (
        <div>
          <h2>User Profile</h2>
          <p>Username: {profileUser.username}</p>
          <p>Email: {profileUser.email}</p>
          {/* Display other user data as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;

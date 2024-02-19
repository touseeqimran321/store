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
        if (user) {
          const userId = user.id; // Access the user ID from the user object
          const response = await axios.get(`https://b437-2400-adc5-453-1500-15bb-ce97-5be3-96cd.ngrok-free.app/api/user/${userId}`, {
            headers: {
              'ngrok-skip-browser-warning': 'avoid'
            }
          });
          setProfileUser(response.data);
        }
      } catch (error) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, [user]);

  return (
    <div>
      {error && <p>{error}</p>}
      {profileUser !== null ? (
        <div>
          <h2>User Profile</h2>
          <p>Username: {profileUser.username}</p>
          <p>Email: {profileUser.email}</p>
          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>User does not exist</p>
      )}
    </div>
  );
};

export default Profile;

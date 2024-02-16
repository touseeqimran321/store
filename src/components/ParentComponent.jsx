// YourComponent.js
import React from 'react';
import { useAuth } from '../AuthContext';

function YourComponent() {
  const { user } = useAuth();

  if (user) {
    return (
      <div>
        <p>Welcome, {user.username}!</p>
        <p>Email: {user.email}</p>
      </div>
    );
  } else {
    return <p>Please log in to access this content.</p>;
  }
}

export default YourComponent;

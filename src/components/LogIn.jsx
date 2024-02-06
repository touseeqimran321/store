import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isSignUp) {
        // Sign up logic
        const response = await axios.post('https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app/api/signup', { username, email, password });
        console.log('Sign up successful:', response.data);
        // Display alert after successful sign-up
        window.alert('Sign up successful!');
        // Navigate only after successful signup
        navigate("/Profile");
      } else {
        // Login logic
        const response = await axios.post('https://05bc-2400-adc5-453-1500-7d00-d26c-a7b3-29a9.ngrok-free.app/api/login', { email, password });
        console.log('Login successful:', response.data);
        // Display alert after successful login
        window.alert('Login successful!');
        // Navigate only after successful login
        navigate("/Profile");
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      // Display alert for errors
      window.alert('Error occurred. Please try again.');
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">{isSignUp ? 'Sign Up' : 'Login'}</button>
          </form>
          <p className="mt-3">
            {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
            <Link to="/SignUp" onClick={() => setIsSignUp(!isSignUp)}>
  {isSignUp ? 'Login' : 'Sign Up'}
</Link>

          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogin;
//  loader , css alert , 
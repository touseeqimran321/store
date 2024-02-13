import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';

const SignUpLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const response = await axios.post('https://0ec3-2400-adc5-453-1500-907c-6c3d-f922-3664.ngrok-free.app/api/signup', { username, email, password });
        console.log('Sign up successful:', response.data);
        setAlertMessage('Sign up successful!');
        localStorage.setItem('token', response.data.token); // Set authentication flag
        navigate("/List");
      } else {
        const response = await axios.post('https://0ec3-2400-adc5-453-1500-907c-6c3d-f922-3664.ngrok-free.app/api/login', { email, password });
        console.log('Login successful:', response.data);
        setAlertMessage('Login successful!');
        localStorage.setItem('token', response.data.token); // Set authentication flag
        navigate("/List");
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setAlertMessage('Error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
          {alertMessage && <div className={`alert ${alertMessage.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">{alertMessage}</div>}
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
            <button type="submit" className="btn btn-primary">{isLoading ? <BallTriangle type="ThreeDots" color="#fff" height={10} width={30} /> : isSignUp ? 'Sign Up' : 'Login'}</button>
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

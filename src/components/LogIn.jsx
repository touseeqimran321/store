import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { useAuth } from '../AuthContext';

const SignUpLogin = () => {
  const { signup, login, isLoading, error } = useAuth();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      await signup({ username, email, password });
    } else {
      await login({ email, password });
    }
    navigate("/List");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 form-container">
          <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
          {error && <div className="alert alert-danger">{error}</div>}
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

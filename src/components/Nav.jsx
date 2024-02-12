import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav({ profilePicture, isAuthenticated }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State for loader visibility

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigationClick = () => {
    setIsLoading(true); // Show loader when navigation link is clicked
    // Simulate navigation delay (you can replace this with your actual navigation logic)
    setTimeout(() => {
      setIsLoading(false); // Hide loader after navigation is complete
    }, 1000);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {isLoading && ( // Render loader if isLoading is true
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="container-fluid">
        <div className="navbar-brand-wrapper">
          <Link className="navbar-brand" to="/List">
            Product
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/Product"
                onClick={handleNavigationClick}
              >
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/list"
                onClick={handleNavigationClick}
              >
                ProductList
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/Cart"
                onClick={handleNavigationClick}
              >
                Cart
              </Link>
            </li>
            {/* Render profile link if user is authenticated */}
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}
          </ul>
          {/* Render profile picture only if available */}
          {profilePicture && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
              </li>
            </ul>
          )}
        </div>
        {/* Render "Register Now" link for large screens if not authenticated */}
        {!isAuthenticated && (
          <div className="d-none d-lg-block"> {/* Hide on small screens */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link LogIn" to="/LogIn">
                  Register Now
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

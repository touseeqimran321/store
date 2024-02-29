import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useAuth } from '../AuthContext';

export default function Nav({ handleNavigationClick }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showProfileOptions, setShowProfileOptions] = useState(false); // State for profile options visibility
  const { isAuthenticated, logout } = useAuth();
const {user} = useAuth()
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleProfileClick = () => {
    // Toggle the visibility of profile options dropdown
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogout = () => {
    logout();
    setShowProfileOptions(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/Profile">Profile</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="d-none d-lg-block"> {/* Hide on small screens */}
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                {/* Use "dropdown" class for the parent li */}
                <button 
                  className="nav-link dropdown-toggle" 
                  onClick={handleProfileClick}
                  aria-expanded={showProfileOptions ? "true" : "false"} // Indicate whether dropdown is open
                >
                  Profile
                </button>
                {showProfileOptions && (
                 <ul className="dropdown-menu dropdown-menu-end show">
                 <li><p><strong>Name:</strong> {user.username}</p></li>
                 <li><p><strong>Email:</strong> {user.email}</p></li>
                 <li><Link className="dropdown-item" to="/History">History</Link></li>
                 <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
               </ul>
               
                )}
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link LogIn" to="/LogIn">
                  Register Now
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

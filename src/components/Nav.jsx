import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav({ profilePicture }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/List">
            Product
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/Product">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list">
                  ProductList
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div className="navbar-nav ml-auto">
            <Link className="nav-link LogIn" to="/LogIn">
              Register Now
            </Link>
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

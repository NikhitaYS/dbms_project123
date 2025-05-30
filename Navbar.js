import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-container container">
        <Link to="/" className="nav-logo">
          Food Delivery
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 
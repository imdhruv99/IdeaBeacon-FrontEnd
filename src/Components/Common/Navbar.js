import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">IdeaBeacon</div>
      <div className="navbar-login">
        <button className="login-button">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;

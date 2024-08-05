import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">IdeaBeacon</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/post-idea">Post Idea</Link>
        <button className="login-button">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
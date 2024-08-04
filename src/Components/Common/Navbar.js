import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log("isLoggedIn ->", isLoggedIn);

  return (
    <nav className="navbar">
      <div className="navbar-logo">IdeaBeacon</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/post-idea">Post Idea</Link>
        <Link to="/ideas">Ideas</Link>
        <button className="login-button">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;

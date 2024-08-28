import "./Navbar.css";

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import { setIsLoggedIn } from "../../Redux/slice/auth-slice";
import { clearCurrentUser } from "../../Redux/slice/common-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { instance } = useMsal();

  const handleLogout = async () => {
    dispatch(setIsLoggedIn(false));
    localStorage.removeItem('accessToken');
    dispatch(clearCurrentUser());
    await instance.logoutRedirect({
      postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_URI,
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">IdeaBeacon</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/post-idea">Post Idea</Link>
        <Link to="/ideas">Ideas</Link>
        <Link to="/my-ideas">My Ideas</Link>
        <button className="login-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

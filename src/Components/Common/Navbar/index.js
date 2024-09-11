import "./Navbar.css";

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import { setIsLoggedIn } from "../../Redux/slice/auth-slice";
import { clearCurrentUser } from "../../Redux/slice/common-slice";
import { reSetIdeaFilters } from "../../Redux/slice/idea-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { instance } = useMsal();

  const handleFilters = () => {
    dispatch(reSetIdeaFilters());
  };

  const handleLogout = async () => {
    dispatch(setIsLoggedIn(false));
    localStorage.removeItem("accessToken");
    dispatch(clearCurrentUser());
    handleFilters();
    await instance.logoutRedirect({
      postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_URI,
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">IdeaBeacon</div>
      <div className="navbar-links">
        <Link to="/dashboard" onClick={handleFilters}>
          Dashboard
        </Link>
        <Link to="/post-idea" onClick={handleFilters}>
          Post Idea
        </Link>
        <Link to="/ideas" onClick={handleFilters}>
          Ideas
        </Link>
        <Link to="/my-ideas" onClick={handleFilters}>
          My Ideas
        </Link>
        <Link to="/about" onClick={handleFilters}>
          About
        </Link>
        <button className="login-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

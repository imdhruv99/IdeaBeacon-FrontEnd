import "./Navbar.css";

import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import { setIsLoggedIn } from "../../Redux/slice/auth-slice";
import { clearCurrentUser } from "../../Redux/slice/common-slice";
import { reSetIdeaFilters } from "../../Redux/slice/idea-slice";
import { persistor } from "../../Redux/store";

const Navbar = () => {
    const dispatch = useDispatch();
    const { instance } = useMsal();
    const location = useLocation();

    const handleFilters = () => {
        dispatch(reSetIdeaFilters());
    };

    const handleLogout = async () => {
        dispatch(setIsLoggedIn(false));
        localStorage.removeItem("accessToken");
        dispatch(clearCurrentUser());
        handleFilters();
        await persistor.purge();
        localStorage.removeItem("persist:root");
        await instance.logoutRedirect({
            postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_URI,
        });
    };

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userRole = currentUser ? currentUser.role.roleName : null;

    return (
        <nav className="navbar">
            <div className="navbar-logo">IdeaBeacon</div>
            <div className="navbar-links">
                {["/dashboard", "/post-idea", "/ideas", "/my-ideas", "/about", "/user-guide"].map((path) => (
                    <Link
                        key={path}
                        to={path}
                        onClick={handleFilters}
                        className={location.pathname === path ? "active" : ""}
                    >
                        {path.split("/").pop().replace("-", " ").charAt(0).toUpperCase() +
                            path.split("/").pop().replace("-", " ").slice(1) || "Home"}
                    </Link>
                ))}
                {userRole === "ROLE_ADMIN" && (
                    <Link
                        to="/admin"
                        onClick={handleFilters}
                        className={location.pathname === "/admin" ? "active" : ""}
                    >
                        Administrator Hub
                    </Link>
                )}
                <button className="login-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

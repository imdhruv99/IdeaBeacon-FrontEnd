import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { reSetIdeaFilters } from "../../Redux/slice/idea-slice";
import { useDispatch } from "react-redux";

import ErrorImage from "../../../Assets/svg/error.svg";

const NotFound = () => {
    const dispatch = useDispatch();
    const handleFilters = () => {
        dispatch(reSetIdeaFilters());
    };

    return (
        <div className="not-found">
            <img src={ErrorImage} alt="Error Icon" className="error-icon" />
            <p className="not-found-message">Oops! Page not found.</p>
            <p className="available-pages">Available Pages</p>
            <div className="not-found-links">
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
                <Link to="/user-guide" onClick={handleFilters}>
                    User Guide
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

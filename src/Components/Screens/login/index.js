import "./LoginPage.css";

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setIsLoggedIn } from "../../Redux/slice/auth-slice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Ideas</h1>
        <h1 className="landing-title">& Innovations</h1>
        <p>Share your ideas and collaborate with other Junivators.</p>
        <button
          className="login-button"
          onClick={() => {
            dispatch(setIsLoggedIn(true));
            navigate("/dashboard");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

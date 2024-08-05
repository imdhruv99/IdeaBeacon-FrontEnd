import "./LoginPage.css";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import { setAccessToken, setIsLoggedIn } from "../../Redux/slice/auth-slice";
import { loginRequest } from "../../../authConfig";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { instance, accounts } = useMsal();

  const handleAzureLogin = async () => {
    await instance.loginRedirect(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const getGraphCall = async () => {
    if (accounts.length > 0) {
      if (accounts[0].idToken !== "") {
        dispatch(setAccessToken(accounts[0].idToken));
        dispatch(setIsLoggedIn(true));
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    getGraphCall();
  }, [accounts, instance]);

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Ideas</h1>
        <h1 className="landing-title">& Innovations</h1>
        <p>Share your ideas and collaborate with other Junivators.</p>
        <button className="login-button" onClick={handleAzureLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

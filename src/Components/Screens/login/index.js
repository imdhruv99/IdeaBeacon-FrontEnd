import "./LoginPage.css";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

import { setIsLoggedIn } from "../../Redux/slice/auth-slice";
import { login } from "../../Redux/api/authAPI";
import { loginRequest } from "../../../authConfig";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const { instance, accounts } = useMsal();

  const [graphData, setGraphData] = useState(null);

  const handleLogin = async () => {
    await instance.loginRedirect(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const callMsGraph = async (accessToken) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };

    return fetch("https://graph.microsoft.com/v1.0/me", options)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  const getGraphCall = async () => {
    if (accounts.length > 0) {
      const request = {
        ...loginRequest,
        account: accounts[0],
      };

      instance
        .acquireTokenSilent(request)
        .then((response) => {
          callMsGraph(response.accessToken).then((response) => {
            setGraphData(response);
          });
        })
        .catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(response.accessToken).then((response) => setGraphData(response));
          });
        });
    }
  };

  useEffect(() => {
    getGraphCall();
  }, [accounts, instance]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setIsLoggedIn(true));
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Ideas</h1>
        <h1 className="landing-title">& Innovations</h1>
        <p>Share your ideas and collaborate with other Junivators.</p>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

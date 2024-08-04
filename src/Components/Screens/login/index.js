import "./LoginPage.css";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

import { setAccessToken, setIsLoggedIn } from "../../Redux/slice/auth-slice";
import { loginRequest } from "../../../authConfig";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const handleAzureLogin = async () => {
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
      .then((res) => {
        const userInfo = {
          oid: res.id,
          name: res.displayName,
          preferredUsername: res.userPrincipalName,
        };

        dispatch(setAccessToken(accessToken));
      })
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
          callMsGraph(response.accessToken);
        })
        .catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
            callMsGraph(response.accessToken);
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
        <button className="login-button" onClick={handleAzureLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

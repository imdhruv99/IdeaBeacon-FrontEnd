import "./LoginPage.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import { setAccessToken, setIsCreatingUser, setIsLoggedIn } from "../../Redux/slice/auth-slice";
import { loginRequest } from "../../../authConfig";
import { createUser } from "../../Redux/api/authAPI";
import Loader from "../../Common/Loader/index.js";
import { toRoman } from "../../utils/utils.js";
import { incrementSiteVisitStatistics } from "../../Redux/api/siteStatisticsAPI";
import moment from "moment-timezone";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { instance, accounts } = useMsal();

    const { isCreatingUser } = useSelector((state) => state.auth);

    const handleAzureLogin = async () => {
        await instance.loginRedirect(loginRequest).catch((e) => {
            console.error(e);
        });
    };

    const getGraphCall = async () => {
        if (accounts.length > 0) {
            if (accounts[0].idToken !== "") {
                let lastLoggedInTime = moment(accounts[0].idTokenClaims.iat * 1000)
                    .tz("Asia/Kolkata")
                    .format("ddd MMM DD YYYY HH:mm:ss");
                dispatch(setIsCreatingUser(true));
                dispatch(setAccessToken(accounts[0].idToken));
                let response = await dispatch(
                    createUser({
                        preferredUsername: accounts[0].idTokenClaims.preferred_username,
                        name: accounts[0].idTokenClaims.name,
                        oid: accounts[0].idTokenClaims.oid,
                        lastLoggedInTime: lastLoggedInTime,
                    })
                );
                if (response.status !== 500) {
                    dispatch(setIsLoggedIn(true));
                    dispatch(incrementSiteVisitStatistics());
                    navigate("/dashboard");
                }
                dispatch(setIsCreatingUser(false));
            }
        }
    };

    useEffect(() => {
        getGraphCall();
    }, [accounts, instance]);

    const currentYear = new Date().getFullYear();
    const romanNumeral = toRoman(currentYear - 2014);

    return (
        <div className="landing-page">
            <div className="landing-content">
                <h3 className="demo-day">Demo Day {romanNumeral}</h3>
                <h1 className="landing-title">Ideas</h1>
                <h1 className="landing-title">& Innovations</h1>
                <p>Share your ideas and collaborate with other Junivators.</p>
                <button className="login-button" onClick={handleAzureLogin}>
                    Login
                </button>
            </div>
            {isCreatingUser && <Loader />}
        </div>
    );
};

export default Login;

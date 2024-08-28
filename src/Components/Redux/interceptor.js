import { useMsal } from "@azure/msal-react";
import httpService from "./httpService";
import { setIsLoggedIn } from "./slice/auth-slice";
import { clearCurrentUser } from "./slice/common-slice";
import React from "react";

const useInterceptor = (store) => {
    const { instance } = useMsal();

    React.useEffect(() => {
        const requestInterceptor = async (config) => {
            config.metadata = { startTime: new Date() };
            return config;
        };

        const responseInterceptor = (response) => {
            response.config.metadata.endTime = new Date();
            response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
            return Promise.resolve(response);
        };

        const responseErrorInterceptor = async (error) => {
            error.config.metadata.endTime = new Date();
            error.duration = error.config.metadata.endTime - error.config.metadata.startTime;

            if (error.response.status === 401) {
                store.dispatch(setIsLoggedIn(false));
                localStorage.removeItem('accessToken');
                store.dispatch(clearCurrentUser());
                await instance.logoutRedirect({
                    postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_URI,
                });
            }

            return Promise.reject(error);
        };

        httpService.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
        httpService.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

        return () => {
            // Cleanup interceptors if needed
            httpService.interceptors.request.eject(requestInterceptor);
            httpService.interceptors.response.eject(responseInterceptor);
            httpService.interceptors.response.eject(responseErrorInterceptor);
        };
    }, [instance, store]);

    // This custom hook does not need to render anything
    return null;
};

export default useInterceptor;

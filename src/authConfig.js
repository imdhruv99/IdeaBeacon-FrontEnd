export const msalConfig = {
  auth: {
    clientId: "609be797-b0e9-43d5-b143-b07025ce8b08", // Replace with your client ID
    authority: "https://login.microsoftonline.com/e73650b3-6b7f-4153-b461-73698e720628",
    redirectUri: "http://localhost:3000", // Replace with your redirect URI
    postLogoutRedirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage", // Determines where your cache will be stored
    storeAuthStateInCookie: false, // Set to true if you are having issues on IE11 or Edge
  },
};

export const loginRequest = {
  scopes: ["User.Read", "profile", "email", "openid"],
};

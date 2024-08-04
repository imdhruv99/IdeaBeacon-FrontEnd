import httpService from "./httpService";
import { store } from "./store";

export default class Webservice {
  static POST = async (strURL, params, isMultiPartForm) => {
    // const accessToken = store.getState().user.accessToken;

    // httpService.defaults.headers.common["Authorization"] = `Bearer ${accessToken.access_token}`;

    return httpService
      .post(strURL, params, {
        headers: {
          "content-type": isMultiPartForm ? "multipart/form-data" : "application/json",
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };

  static GET = async (strURL, params) => {
    // const accessToken = store.getState().user.accessToken;

    // httpService.defaults.headers.common["Authorization"] = `Bearer ${accessToken.access_token}`;

    return httpService
      .get(strURL, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(`error while ${strURL}`, error);
        return error;
      });
  };

  static DELETE = async (strURL, params) => {
    // const accessToken = store.getState().user.accessToken;

    // httpService.defaults.headers.common["Authorization"] = `Bearer ${accessToken.access_token}`;

    return httpService
      .delete(strURL, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };

  static PATCH = async (strURL, params) => {
    // const accessToken = store.getState().user.accessToken;

    // httpService.defaults.headers.common["Authorization"] = `Bearer ${accessToken.access_token}`;

    return httpService
      .patch(strURL, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };
}

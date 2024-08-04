import httpService from "./httpService";
import { store } from "./store";

export default class Webservice {
  static POST = async (strURL, params) => {
    const accessToken = store.getState().auth.accessToken;

    httpService.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return httpService
      .post(strURL, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };

  static GET = async (strURL, params) => {
    const accessToken = store.getState().auth.accessToken;

    httpService.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

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
    const accessToken = store.getState().auth.accessToken;

    httpService.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return httpService
      .delete(strURL, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };

  static PUT = async (strURL, params) => {
    const accessToken = store.getState().auth.accessToken;

    httpService.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return httpService
      .put(strURL, params)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  };
}

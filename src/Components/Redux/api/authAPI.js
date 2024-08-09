import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { AUTH_APIS } from "../apiConstants";

export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.POST(`${AUTH_APIS.CREATE_USER}`, data);
    return response;
  } catch (error) {
    console.log(`${AUTH_APIS.CREATE_USER}`, error);
    return rejectWithValue(error.response.data.data);
  }
});
import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { AUTH_APIS } from "../apiConstants";

export const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${AUTH_APIS.LOGIN}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${AUTH_APIS.LOGIN}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

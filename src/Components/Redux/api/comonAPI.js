import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { COMMON_APIS } from "../apiConstants";

export const getAllStages = createAsyncThunk("getAllStages", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_STAGES}`, data);

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_STAGES}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllCategory = createAsyncThunk("getAllCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_CATEGORIES}`, data);

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_CATEGORIES}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllFunctions = createAsyncThunk("getAllFunctions", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_FUNCTIONS}`, data);

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_FUNCTIONS}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllSubdivisionById = createAsyncThunk("getAllSubdivisionById", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_SUBDIVISION_BY_FUNCTION_ID}`, data);

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_FUNCTIONS}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

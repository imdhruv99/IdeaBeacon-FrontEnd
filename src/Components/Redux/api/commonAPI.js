import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { COMMON_APIS } from "../apiConstants";

export const getAllStages = createAsyncThunk("getAllStages", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_STAGES}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_STAGES}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllCategory = createAsyncThunk("getAllCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_CATEGORIES}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_CATEGORIES}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllFunctions = createAsyncThunk("getAllFunctions", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_FUNCTIONS}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_FUNCTIONS}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllSubDivByFunId = createAsyncThunk("getAllSubDivByFunId", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_SUBDIVISION_BY_FUNCTION_ID}${data}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_SUBDIVISION_BY_FUNCTION_ID}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllUserList = createAsyncThunk("getAllUserList", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_USER}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_USER}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

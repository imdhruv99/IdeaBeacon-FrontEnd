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

export const getAllVerticals = createAsyncThunk("getAllVertical", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_VERTICALS}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_VERTICALS}`, error);
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

export const getAllUserList = createAsyncThunk("getAllUserList", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_USER}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_USER}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllTagsList = createAsyncThunk("getAllTagsList", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.GET(`${COMMON_APIS.GET_ALL_TAGS}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${COMMON_APIS.GET_ALL_TAGS}`, error);
    return rejectWithValue(error.response.data.data);
  }
});
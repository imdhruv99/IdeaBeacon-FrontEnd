import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { IDEA_APIS } from "../apiConstants";

export const createIdea = createAsyncThunk("createIdea", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.POST(`${IDEA_APIS.CREATE_IDEA}`, data);

    return response.data.data;
  } catch (error) {
    console.log(`${IDEA_APIS.CREATE_IDEA}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getAllFilteredIdeas = createAsyncThunk("getAllFilteredIdeas", async (data, { rejectWithValue }) => {
  try {
    const response = await Webservice.POST(`${IDEA_APIS.GET_ALL_FILTERED_IDEAS}`, data);

    return response.data.data;
  } catch (error) {
    console.log(`${IDEA_APIS.GET_ALL_FILTERED_IDEAS}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

export const getIdeaDetail = createAsyncThunk("getIdeaDetail", async (data, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await Webservice.GET(`${IDEA_APIS.GET_IDEA_DETAIL}/${data}`, {});

    return response.data.data;
  } catch (error) {
    console.log(`${IDEA_APIS.GET_IDEA_DETAIL}`, error);
    return rejectWithValue(error.response.data.data);
  }
});

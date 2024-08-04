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

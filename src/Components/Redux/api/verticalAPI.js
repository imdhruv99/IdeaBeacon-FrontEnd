import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { VERTICAL_APIS } from "../apiConstants";

export const createVertical = createAsyncThunk("createVertical", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.POST(`${VERTICAL_APIS.CREATE_VERTICAL}`, data);

        return response.data.data;
    } catch (error) {
        console.log(`${VERTICAL_APIS.CREATE_VERTICAL}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const updateVertical = createAsyncThunk("updateVertical", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.PUT(`${VERTICAL_APIS.UPDATE_VERTICAL}/${data.id}`, data);

        return response.data.data;
    } catch (error) {
        console.log(`${VERTICAL_APIS.UPDATE_VERTICAL}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const deleteVertical = createAsyncThunk("deleteVertical", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.DELETE(`${VERTICAL_APIS.DELETE_VERTICAL}/${data}`, data);
        return response.data.data;
    } catch (error) {
        console.log(`${VERTICAL_APIS.DELETE_VERTICAL}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

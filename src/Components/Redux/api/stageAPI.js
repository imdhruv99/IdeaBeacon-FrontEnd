import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { STAGE_APIS } from "../apiConstants";

export const createStage = createAsyncThunk("createStage", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.POST(`${STAGE_APIS.CREATE_STAGE}`, data);

        return response.data.data;
    } catch (error) {
        console.log(`${STAGE_APIS.CREATE_STAGE}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const updateStage = createAsyncThunk("updateStage", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.PUT(`${STAGE_APIS.UPDATE_STAGE}/${data.id}`, data);

        return response.data.data;
    } catch (error) {
        console.log(`${STAGE_APIS.UPDATE_STAGE}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const deleteStage = createAsyncThunk("deleteStage", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.DELETE(`${STAGE_APIS.DELETE_STAGE}/${data}`, data);
        return response.data.data;
    } catch (error) {
        console.log(`${STAGE_APIS.DELETE_STAGE}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { DEMO_DAYS_APIS } from "../apiConstants";

export const createDemoDay = createAsyncThunk("createDemoDay", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.POST(`${DEMO_DAYS_APIS.CREATE_DEMO_DAY}`, data);

        return response.data.data;
    } catch (error) {
        console.log(`${DEMO_DAYS_APIS.CREATE_DEMO_DAY}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const updateDemoDay = createAsyncThunk("updateDemoDay", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.PUT(`${DEMO_DAYS_APIS.UPDATE_DEMO_DAY}/${data.id}`, data);

        return response.data.data;
    } catch (error) {
        console.log(`${DEMO_DAYS_APIS.UPDATE_DEMO_DAY}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const deleteDemoDay = createAsyncThunk("deleteDemoDay", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.DELETE(`${DEMO_DAYS_APIS.DELETE_DEMO_DAY}/${data}`, data);
        return response.data.data;
    } catch (error) {
        console.log(`${DEMO_DAYS_APIS.DELETE_DEMO_DAY}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

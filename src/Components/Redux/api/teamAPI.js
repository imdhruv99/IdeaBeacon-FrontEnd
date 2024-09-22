import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { TEAM_APIS } from "../apiConstants";

export const createTeam = createAsyncThunk("createTeam", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.POST(`${TEAM_APIS.CREATE_TEAM}`, data);

        return response.data.data;
    } catch (error) {
        console.log(`${TEAM_APIS.CREATE_TEAM}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const updateTeam = createAsyncThunk("updateTeam", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.PUT(`${TEAM_APIS.UPDATE_TEAM}/${data.id}`, data);

        return response.data.data;
    } catch (error) {
        console.log(`${TEAM_APIS.UPDATE_TEAM}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const deleteTeam = createAsyncThunk("deleteTeam", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.DELETE(`${TEAM_APIS.DELETE_TEAM}/${data}`, data);
        return response.data.data;
    } catch (error) {
        console.log(`${TEAM_APIS.DELETE_TEAM}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

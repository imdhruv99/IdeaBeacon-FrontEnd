import { createAsyncThunk } from "@reduxjs/toolkit";

import Webservice from "../webService";
import { COMMENT } from "../apiConstants";

export const createComment = createAsyncThunk("createComment", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.POST(`${COMMENT.CREATE_COMMENT}/${data.ideaId}`, data);
        return response.data.data;
    } catch (error) {
        console.log(`${COMMENT.CREATE_COMMENT}`, error);
        return rejectWithValue(error.response.data.data);
    }
});

export const getIdeaCommentsList = createAsyncThunk("getIdeaCommentsList", async (data, { rejectWithValue }) => {
    try {
        const response = await Webservice.GET(`${COMMENT.GET_COMMENT}/${data}`, {});

        return response.data.data;
    } catch (error) {
        console.log(`${COMMENT.GET_COMMENT}`, error);
        return rejectWithValue(error.response.data.data);
    }
});
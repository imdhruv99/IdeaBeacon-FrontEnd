import { createSlice } from "@reduxjs/toolkit";
import { createStage, deleteStage, updateStage } from "../api/stageAPI";

const initialState = {
    isUpdatingStage: false,
    isLoading: false,
};

export const stageSlice = createSlice({
    name: "stage",
    initialState,
    reducers: {
        setIsUpdatingStage(state, action) {
            state.isUpdatingStage = action.payload;
        },
    },
    extraReducers: (builder) => {
        //Create Stage
        builder.addCase(createStage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createStage.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(createStage.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ createStage:", action);
            state.isLoading = false;
        });

        //Update Stage
        builder.addCase(updateStage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateStage.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateStage.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ updateStage:", action);
            state.isLoading = false;
        });

        //Delete Stage
        builder.addCase(deleteStage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteStage.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteStage.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ deleteStage:", action);
            state.isLoading = false;
        });
    },
});

export const { setIsUpdatingStage } = stageSlice.actions;

export default stageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createVertical, deleteVertical, updateVertical } from "../api/verticalAPI";

const initialState = {
    isUpdatingVertical: false,
    isLoading: false,
};

export const verticalSlice = createSlice({
    name: "vertical",
    initialState,
    reducers: {
        setIsUpdatingVertical(state, action) {
            state.isUpdatingVertical = action.payload;
        },
    },
    extraReducers: (builder) => {
        //Create Vertical
        builder.addCase(createVertical.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createVertical.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(createVertical.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ createVertical:", action);
            state.isLoading = false;
        });

        //Update Vertical
        builder.addCase(updateVertical.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateVertical.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateVertical.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ updateVertical:", action);
            state.isLoading = false;
        });

        //Delete Vertical
        builder.addCase(deleteVertical.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteVertical.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteVertical.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ deleteVertical:", action);
            state.isLoading = false;
        });
    },
});

export const { setIsUpdatingVertical } = verticalSlice.actions;

export default verticalSlice.reducer;

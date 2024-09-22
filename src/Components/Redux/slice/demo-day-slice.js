import { createSlice } from "@reduxjs/toolkit";
import { createDemoDay, deleteDemoDay, updateDemoDay } from "../api/demoDayAPI";

const initialState = {
    isUpdatingDemoDay: false,
    isLoading: false,
};

export const demoDaySlice = createSlice({
    name: "demoDay",
    initialState,
    reducers: {
        setIsUpdatingDemoDay(state, action) {
            state.isUpdatingDemoDay = action.payload;
        },
    },
    extraReducers: (builder) => {
        //Create Demo Day
        builder.addCase(createDemoDay.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createDemoDay.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(createDemoDay.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ createDemoDay:", action);
            state.isLoading = false;
        });

        //Update Demo Day
        builder.addCase(updateDemoDay.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateDemoDay.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateDemoDay.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ updateDemoDay:", action);
            state.isLoading = false;
        });

        //Delete Demo Day
        builder.addCase(deleteDemoDay.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteDemoDay.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteDemoDay.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ deleteDemoDay:", action);
            state.isLoading = false;
        });
    },
});

export const { setIsUpdatingDemoDay } = demoDaySlice.actions;

export default demoDaySlice.reducer;

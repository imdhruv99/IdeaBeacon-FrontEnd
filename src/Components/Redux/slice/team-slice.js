import { createSlice } from "@reduxjs/toolkit";
import { createTeam, deleteTeam, updateTeam } from "../api/teamAPI";

const initialState = {
    isUpdatingTeam: false,
    isLoading: false,
};

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setIsUpdatingTeam(state, action) {
            state.isUpdatingTeam = action.payload;
        },
    },
    extraReducers: (builder) => {
        //Create Team
        builder.addCase(createTeam.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createTeam.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(createTeam.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ createTeam:", action);
            state.isLoading = false;
        });

        //Update Team
        builder.addCase(updateTeam.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateTeam.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateTeam.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ updateTeam:", action);
            state.isLoading = false;
        });

        //Delete Team
        builder.addCase(deleteTeam.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteTeam.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteTeam.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ deleteTeam:", action);
            state.isLoading = false;
        });
    },
});

export const { setIsUpdatingTeam } = teamSlice.actions;

export default teamSlice.reducer;

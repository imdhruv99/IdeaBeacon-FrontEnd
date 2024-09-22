import { createSlice } from "@reduxjs/toolkit";

import {
    getAllVerticals,
    getAllFunctions,
    getAllStages,
    getAllUserList,
    getAllTagsList,
    getAllDemoDayList,
} from "../api/commonAPI";
import { createUser } from "../api/authAPI";

const initialState = {
    stages: [],
    verticals: [],
    functions: [],
    users: [],
    tags: [],
    demoDays: [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || undefined,
    allUsers: [],
};

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        clearCurrentUser: (state) => {
            state.currentUser = undefined;
            localStorage.removeItem("currentUser");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            const data = action.payload?.data;
            state.currentUser = data;
            localStorage.setItem("currentUser", JSON.stringify(data));
        });

        // fetch all stages
        builder.addCase(getAllStages.fulfilled, (state, action) => {
            const data = action.payload;

            state.stages = data;
        });

        builder.addCase(getAllStages.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ getAllStages:", action);
        });

        // fetch all verticals
        builder.addCase(getAllVerticals.fulfilled, (state, action) => {
            const data = action.payload;

            state.verticals = data;
        });

        builder.addCase(getAllVerticals.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ getAllVertical:", action);
        });

        // fetch all functions
        builder.addCase(getAllFunctions.fulfilled, (state, action) => {
            const data = action.payload;

            state.functions = data;
        });

        builder.addCase(getAllFunctions.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ getAllFunctions:", action);
        });

        // fetch all users list
        builder.addCase(getAllUserList.fulfilled, (state, action) => {
            const data = action.payload;
            state.allUsers = data;
            const updatedUserList = state.currentUser
                ? data.filter((user) => user.oid !== state.currentUser?.oid)
                : data;
            state.users = updatedUserList;
        });
        builder.addCase(getAllUserList.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ getAllUserList:", action);
        });

        // fetch all tags list
        builder.addCase(getAllTagsList.fulfilled, (state, action) => {
            const data = action.payload;
            state.tags = data;
        });

        builder.addCase(getAllTagsList.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ getAllTagsList:", action);
        });

        // fetch all tags list
        builder.addCase(getAllDemoDayList.fulfilled, (state, action) => {
            const data = action.payload;
            state.demoDays = data;
        });

        builder.addCase(getAllDemoDayList.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ getAllTagsList:", action);
        });
    },
});

export const { setCurrentUser, clearCurrentUser } = commonSlice.actions;

export default commonSlice.reducer;

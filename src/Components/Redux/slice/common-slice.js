import { createSlice } from "@reduxjs/toolkit";

import { getAllVerticals, getAllFunctions, getAllStages, getAllSubDivByFunId, getAllUserList, getAllTagsList } from "../api/commonAPI";
import { createUser } from "../api/authAPI";

const initialState = {
  stages: [],
  verticals: [],
  functions: [],
  subdivisions: [],
  users: [],
  tags: [],
  currentUser: undefined,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      const data = action.payload?.data;
      state.currentUser = data;
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

    // fetch all subdivisions by function id
    builder.addCase(getAllSubDivByFunId.fulfilled, (state, action) => {
      const data = action.payload;

      state.subdivisions = data;
    });

    builder.addCase(getAllSubDivByFunId.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ getAllSubDivByFunId:", action);
    });

    // fetch all users list
    builder.addCase(getAllUserList.fulfilled, (state, action) => {
      const data = action.payload;
      const updatedUserList = data.filter((user) => user.oid !== state.currentUser.oid);
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
  },
});

// Action creators are generated for each case reducer function
// export const {} = commonSlice.actions;

export default commonSlice.reducer;

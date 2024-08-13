import { createSlice } from "@reduxjs/toolkit";

import { getAllCategory, getAllFunctions, getAllStages, getAllSubDivByFunId, getAllUserList } from "../api/comonAPI";
import { createUser } from "../api/authAPI";

const initialState = {
  stages: [],
  categories: [],
  functions: [],
  subdivisions: [],
  userList: [],
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

    // fetch all categories
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      const data = action.payload;

      state.categories = data;
    });

    builder.addCase(getAllCategory.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ getAllCategory:", action);
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
      state.userList = updatedUserList;
    });

    builder.addCase(getAllUserList.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ getAllUserList:", action);
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = commonSlice.actions;

export default commonSlice.reducer;

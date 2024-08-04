import { createSlice } from "@reduxjs/toolkit";

import { getAllCategory, getAllFunctions, getAllStages } from "../api/comonAPI";

const initialState = {
  stages: [],
  categories: [],
  functions: [],
  subdivisions: [],
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all stages
    builder.addCase(getAllStages.fulfilled, (state, action) => {
      const data = action.payload;
      // console.log("data ->", JSON.stringify(data));

      state.stages = data;
    });

    builder.addCase(getAllStages.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ getAllStages:", action);
    });

    // fetch all categories
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      const data = action.payload;
      // console.log("data ->", JSON.stringify(data));

      state.categories = data;
    });

    builder.addCase(getAllCategory.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ getAllCategory:", action);
    });

    // fetch all functions
    builder.addCase(getAllFunctions.fulfilled, (state, action) => {
      const data = action.payload;
      // console.log("data ->", JSON.stringify(data));

      state.functions = data;
    });

    builder.addCase(getAllFunctions.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ getAllFunctions:", action);
    });

    // fetch all subdivisions by function id
    builder.addCase(getAllSubdivisionById.fulfilled, (state, action) => {
      const data = action.payload;
      // console.log("data ->", JSON.stringify(data));

      state.subdivisions = data;
    });

    builder.addCase(getAllSubdivisionById.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ getAllSubdivisionById:", action);
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = commonSlice.actions;

export default commonSlice.reducer;

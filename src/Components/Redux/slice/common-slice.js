import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory, getAllFunctions, getAllStages, getAllSubdivisionById } from "../api/comonAPI";

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
    // Fetch all stages
    builder
      .addCase(getAllStages.fulfilled, (state, action) => {
        state.stages = action.payload;
      })
      .addCase(getAllStages.rejected, (state, action) => {
        console.error("🚀 ~ rejected ~ getAllStages:", action);
      });

    // Fetch all categories
    builder
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        console.error("🚀 ~ rejected ~ getAllCategory:", action);
      });

    // Fetch all functions
    builder
      .addCase(getAllFunctions.fulfilled, (state, action) => {
        state.functions = action.payload;
      })
      .addCase(getAllFunctions.rejected, (state, action) => {
        console.error("🚀 ~ rejected ~ getAllFunctions:", action);
      });

    // Fetch all subdivisions by function id
    builder
      .addCase(getAllSubdivisionById.fulfilled, (state, action) => {
        state.subdivisions = action.payload;
      })
      .addCase(getAllSubdivisionById.rejected, (state, action) => {
        console.error("🚀 ~ rejected ~ getAllSubdivisionById:", action);
      });
  },
});

export default commonSlice.reducer;

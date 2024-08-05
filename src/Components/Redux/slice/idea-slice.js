import { createSlice } from "@reduxjs/toolkit";
import { createIdea } from "../api/ideaAPI";

const initialState = {
  isIdeaCreating: false,
};

export const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createIdea.pending, (state, action) => {
      state.isIdeaCreating = true;
    });
    builder.addCase(createIdea.fulfilled, (state, action) => {
      const data = action.payload;
      // console.log("data ->", JSON.stringify(data));

      state.isIdeaCreating = false;
    });

    builder.addCase(createIdea.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ createIdea:", action);
      state.isIdeaCreating = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = ideaSlice.actions;

export default ideaSlice.reducer;

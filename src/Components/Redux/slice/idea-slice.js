import { createSlice } from "@reduxjs/toolkit";
import { createIdea, getAllFilteredIdeas, getIdeaDetail } from "../api/ideaAPI";

const initialState = {
  isIdeaCreating: false,
  isFetchingIdeas: false,
  isFetchingIdeaDetail: false,
  allFilteredIdeas: [],
  idea: undefined,
  ideaAuditLogData: undefined,
};

export const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Create Idea
    builder.addCase(createIdea.pending, (state, action) => {
      state.isIdeaCreating = true;
    });
    builder.addCase(createIdea.fulfilled, (state, action) => {
      state.isIdeaCreating = false;
    });
    builder.addCase(createIdea.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ createIdea:", action);
      state.isIdeaCreating = false;
    });

    // Get All Filtered Idea List
    builder.addCase(getAllFilteredIdeas.pending, (state, action) => {
      state.isFetchingIdeas = true;
    });
    builder.addCase(getAllFilteredIdeas.fulfilled, (state, action) => {
      const data = action.payload;

      state.allFilteredIdeas = data;
      state.isFetchingIdeas = false;
    });
    builder.addCase(getAllFilteredIdeas.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ createIdea:", action);
      state.isFetchingIdeas = false;
    });

    // Get Idea Detail
    builder.addCase(getIdeaDetail.pending, (state, action) => {
      state.isFetchingIdeaDetail = true;
    });
    builder.addCase(getIdeaDetail.fulfilled, (state, action) => {
      const data = action.payload;

      state.idea = data.ideaData;
      state.ideaAuditLogData = data.ideaAuditLogData;
      state.isFetchingIdeaDetail = false;
    });
    builder.addCase(getIdeaDetail.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ createIdea:", action);
      state.isFetchingIdeaDetail = false;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = ideaSlice.actions;

export default ideaSlice.reducer;

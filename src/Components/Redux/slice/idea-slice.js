import { createSlice } from "@reduxjs/toolkit";
import { createIdea, getAllFilteredIdeas, getIdeaDetail, updateIdea } from "../api/ideaAPI";

const initialState = {
  isLoading: false,
  allFilteredIdeas: [],
  idea: undefined,
  ideaAuditLogData: undefined,
  isUpdatingIdea: false,
};

export const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    resetIdea(state) {
      state.idea = undefined;
    },
    setIsUpdatingIdea(state, action) {
      state.isUpdatingIdea = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Create Idea
    builder.addCase(createIdea.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createIdea.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createIdea.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ createIdea:", action);
      state.isLoading = false;
    });

    //Update Idea
    builder.addCase(updateIdea.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateIdea.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateIdea.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ updateIdea:", action);
      state.isLoading = false;
    });

    // Get All Filtered Idea List
    builder.addCase(getAllFilteredIdeas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFilteredIdeas.fulfilled, (state, action) => {
      const data = action.payload;

      state.allFilteredIdeas = data;
      state.isLoading = false;
    });
    builder.addCase(getAllFilteredIdeas.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ createIdea:", action);
      state.isLoading = false;
    });

    // Get Idea Detail
    builder.addCase(getIdeaDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIdeaDetail.fulfilled, (state, action) => {
      const data = action.payload;

      state.idea = data.ideaData;
      state.ideaAuditLogData = data.ideaAuditLogData;
      state.isLoading = false;
    });
    builder.addCase(getIdeaDetail.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ createIdea:", action);
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetIdea, setIsUpdatingIdea } = ideaSlice.actions;

export default ideaSlice.reducer;

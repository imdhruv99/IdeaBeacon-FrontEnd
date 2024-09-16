import { createSlice } from "@reduxjs/toolkit";
import {
  createIdea,
  deleteIdea,
  getAllFilteredIdeas,
  getIdeaDetail,
  updateIdea,
  updateIdeaStage,
} from "../api/ideaAPI";

const initialState = {
  isLoading: false,
  allFilteredIdeas: [],
  idea: undefined,
  ideaAuditLogData: undefined,
  selectedIdeaId: localStorage.getItem("selectedIdeaId"),
  isDeletingIdea: false,
  isFetchingIdeas: false,
  ideaFilters: {
    stageId: "",
    verticalId: "",
    authorId: "",
    functionId: "",
    month: "",
    year: "",
  },
  ideaSearchText: "",
  isTopRated: false,
  isTopCommented: false,
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
    setSelectedIdeaId(state, action) {
      state.selectedIdeaId = action.payload;
      localStorage.setItem("selectedIdeaId", action.payload);
    },
    setIdeaFilters(state, action) {
      const existingFilters = JSON.parse(JSON.stringify(state.ideaFilters));

      existingFilters[action.payload.filterName] = action.payload.filterId;

      state.ideaFilters = existingFilters;
    },
    reSetIdeaFilters(state) {
      state.ideaFilters = {
        stageId: "",
        verticalId: "",
        authorId: "",
        functionId: "",
        month: "",
        year: "",
      };
    },
    setIdeaSearchText(state, action) {
      state.ideaSearchText = action.payload;
    },
    setIsTopRate(state, action) {
      state.isTopRated = action.payload;
    },
    setIsTopCommented(state, action) {
      state.isTopCommented = action.payload;
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

    //Update Idea stage
    builder.addCase(updateIdeaStage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateIdeaStage.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateIdeaStage.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ updateIdea:", action);
      state.isLoading = false;
    });

    // Get All Filtered Idea List
    builder.addCase(getAllFilteredIdeas.pending, (state) => {
      state.isLoading = true;
      state.isFetchingIdeas = true;
    });
    builder.addCase(getAllFilteredIdeas.fulfilled, (state, action) => {
      const data = action.payload;

      state.allFilteredIdeas = data;
      state.isLoading = false;
      state.isFetchingIdeas = false;
    });
    builder.addCase(getAllFilteredIdeas.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ createIdea:", action);
      state.isLoading = false;
      state.isFetchingIdeas = false;
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

    //Delete Idea
    builder.addCase(deleteIdea.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteIdea.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteIdea.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ deleteIdea:", action);
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  resetIdea,
  setIsUpdatingIdea,
  setSelectedIdeaId,
  setIsDeletingIdea,
  setIdeaFilters,
  reSetIdeaFilters,
  setIdeaSearchText,
  setIsTopRate,
  setIsTopCommented,
} = ideaSlice.actions;

export default ideaSlice.reducer;

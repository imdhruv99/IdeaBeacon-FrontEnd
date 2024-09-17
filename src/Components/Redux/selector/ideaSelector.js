import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";

const ideas = (state) => state.idea;

export const getIdeaSelector = createSelector([ideas], (ideas) => {
  const searchText = ideas.ideaSearchText;
  const allFilteredIdeas = ideas.allFilteredIdeas;
  const isTopRated = ideas.isTopRated;
  const isTopCommented = ideas.isTopCommented;

  let updatedList = [];

  if (searchText !== "" && searchText !== " " && searchText !== undefined && searchText !== null) {
    updatedList = allFilteredIdeas.filter(function (item) {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = searchText.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
  } else {
    updatedList = allFilteredIdeas;
  }

  if (isTopRated) {
    updatedList = [...updatedList].sort((a, b) => b.likeCount - a.likeCount);
  }

  if (isTopCommented) {
    updatedList = [...updatedList].sort((a, b) => b.commentCount - a.commentCount);
  }

  return updatedList;
});

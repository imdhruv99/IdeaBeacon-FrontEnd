import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import ideaSlice from "./slice/idea-slice";
import commonSlice from "./slice/common-slice";
import siteStatisticsSlice from "./slice/site-statistics-slice";
import commentSlice from "./slice/comment-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    idea: ideaSlice,
    common: commonSlice,
    siteStatistics: siteStatisticsSlice,
    comment: commentSlice,
  },
});

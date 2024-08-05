import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import ideaSlice from "./slice/idea-slice";
import comonSlice from "./slice/common-slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    idea: ideaSlice,
    comon: comonSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import authClice from "./slice/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authClice,
  },
});

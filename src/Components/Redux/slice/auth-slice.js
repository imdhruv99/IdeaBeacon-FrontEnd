import { createSlice } from "@reduxjs/toolkit";

import { login } from "../api/authAPI";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const data = action.payload;

      console.log("data ->", JSON.stringify(data));
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("🚀 ~ rejected ~ login:", action);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;

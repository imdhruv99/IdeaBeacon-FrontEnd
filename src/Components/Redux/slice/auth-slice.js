import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "../api/authAPI";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  isCreatingUser: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isCreatingUser = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.isCreatingUser = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.isCreatingUser = false;
    });
  }
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setAccessToken } = authSlice.actions;

export default authSlice.reducer;

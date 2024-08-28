import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "../api/authAPI";

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  accessToken: localStorage.getItem('accessToken'),
  isCreatingUser: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      localStorage.setItem('isLoggedIn', action.payload);
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setIsCreatingUser: (state, action) => {
      state.isCreatingUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state) => {
      state.isCreatingUser = false;
    });
  }
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, setAccessToken, setIsCreatingUser } = authSlice.actions;

export default authSlice.reducer;

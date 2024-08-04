import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const authClice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn } = authClice.actions;

export default authClice.reducer;

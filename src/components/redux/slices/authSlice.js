import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userId: null,
  ...JSON.parse(localStorage.getItem("auth")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      const { email, userId } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userId = userId;

      localStorage.setItem("auth", JSON.stringify(state));
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userId = null;

      localStorage.removeItem("auth");
    },
  },
});

export const { setActiveUser, logoutUser } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;

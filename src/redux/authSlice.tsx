import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateUserInfo(state, action) {
      state.user = action.payload;
    },

    logout(state) {
      state.token = "";
      state.user = {};
    },
  },
});

export default authSlice.reducer;
export const { login, logout, updateUserInfo } = authSlice.actions;

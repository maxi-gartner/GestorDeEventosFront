import { createReducer } from "@reduxjs/toolkit";
import { savedUserLogin, logout } from "../actions/userAction";

const initialStore = {
  userData: {},
};

const userReducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(savedUserLogin, (state, action) => {
      state.userData = action.payload.data;
    })
    .addCase(logout, () => {
      return initialStore;
    });
});

export default userReducer;

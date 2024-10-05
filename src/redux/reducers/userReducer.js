import { createReducer } from "@reduxjs/toolkit";
import { login, logout } from "../actions/userAction";

const initialStore = {
  userData: {},
  token: null,
};

const userReducer = createReducer(initialStore, (builder) => {
  builder
    .addCase(login, (state, action) => {
      //console.log("payload", action.payload);
      state.userData = action.payload.user;
      state.token = action.payload.token;
      return state;
    })
    .addCase(logout, () => {
      return initialStore;
    });
});

export default userReducer;

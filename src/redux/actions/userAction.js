import { createAction } from "@reduxjs/toolkit";

export const savedUserLogin = createAction("savedUserLogin", (data) => {
  return {
    payload: data,
  };
});

export const logout = createAction("logout", () => {});

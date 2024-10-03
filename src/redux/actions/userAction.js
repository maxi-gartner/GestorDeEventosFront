import { createAction } from "@reduxjs/toolkit";

export const login = createAction("login", (data) => {
  //console.log("data en action", data);
  return {
    payload: {
      user: data.user,
      token: data.token,
    },
  };
});

export const logout = createAction("logout", () => {});

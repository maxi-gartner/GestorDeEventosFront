import { createAction } from "@reduxjs/toolkit";

export const savedEvents = createAction("savedEvents", (data) => {
  return {
    payload: data,
  };
});

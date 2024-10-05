import { createReducer } from "@reduxjs/toolkit";
import { savedEvents } from "../actions/eventsAction";

const initialStore = {
  eventsData: {},
};

const eventsReducer = createReducer(initialStore, (builder) => {
  builder.addCase(savedEvents, (state, action) => {
    state.eventsData = action.payload;
  });
});

export default eventsReducer;

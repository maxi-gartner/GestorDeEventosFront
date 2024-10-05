import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import eventsReducer from "./reducers/eventsReducer";

const options = {
  reducer: {
    user: userReducer,
    events: eventsReducer,
  },
};

const store = configureStore(options);

export default store;

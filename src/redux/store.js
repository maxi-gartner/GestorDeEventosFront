import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
//import eventReducer from "./reducers/eventReducer";

const options = {
  reducer: {
    user: userReducer,
    //events: eventReducer,
  },
};

const store = configureStore(options);

export default store;

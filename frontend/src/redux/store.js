import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middleware = [reduxThunk, logger];

const store = configureStore({
  reducer: rootReducer,
  middleware: [...middleware],
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./boardStore";

export default configureStore({
  reducer: {
    board: counterReducer,
  },
});

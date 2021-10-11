import { configureStore } from "@reduxjs/toolkit";
import boardStore from "./boardStore";

export default configureStore({
  reducer: {
    board: counterReducer,
  },
});

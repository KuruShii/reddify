import topSubsReducer from "../features/topSubs/topSubsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        topSubs: topSubsReducer
    }
 });
  
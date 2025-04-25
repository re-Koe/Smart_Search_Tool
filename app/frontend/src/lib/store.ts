import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import resultsReducer from "./resultsSlice";
import messagesReducer from "./messageSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    results: resultsReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

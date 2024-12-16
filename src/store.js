import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./redux/newsSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default store;

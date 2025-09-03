import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";
import searchTypeSlice from "./searchTypeSlice"

export const store = configureStore({
  reducer: {
    location: locationSlice,
    searchType: searchTypeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

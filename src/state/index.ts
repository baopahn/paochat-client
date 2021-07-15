import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import chatReducer from "./chats";
import profileReducer from "./profiles";
import searchReducer from "./searchs";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    chat: chatReducer,
    profile: profileReducer,
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const dispatch = store.dispatch;

export default store;

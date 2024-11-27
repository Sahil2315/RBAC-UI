import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "./roleSlice";
import postSlice from "./postSlice";
import memberSlice from './memberSlice';

export const store = configureStore({
  reducer: {
    roles: roleSlice,
    posts: postSlice,
    members: memberSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducer";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
  });


export const wrapper = createWrapper(makeStore);
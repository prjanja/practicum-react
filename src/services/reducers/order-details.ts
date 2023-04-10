import { createReducer } from "@reduxjs/toolkit";
import { createOrderEnd } from "../actions";

const initialState = {};

export const orderReducer = createReducer(initialState, (builder) => {
  builder.addCase(createOrderEnd, (state, action) => {
    return action.payload;
  });
});

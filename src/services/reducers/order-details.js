import { createReducer } from "@reduxjs/toolkit";
import { orderConstants } from "../action-types";

const initialState = {};

export const orderReducer = createReducer(initialState, (builder) => {
  builder.addCase(orderConstants.ORDER_FULFILLED, (state, action) => {
    return action.payload;
  });
});

import { createReducer } from "@reduxjs/toolkit";
import { APIOrderInfo, OrderInfo } from "../../utils/types";
import { wsOnMessage } from "../actions";

const initialState: {
  orders: Array<APIOrderInfo>;
  total: number;
  totalToday: number;
  currentElement: OrderInfo | null;
} = {
  orders: [],
  currentElement: null,
  total: 0,
  totalToday: 0,
};

export const feedReducer = createReducer(initialState, (builder) => {
  builder.addCase(wsOnMessage, (state, action) => {
    return { ...state, ...action.payload };
  });
});

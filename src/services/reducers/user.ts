import { createReducer } from "@reduxjs/toolkit";
import {
  getUserEnd,
  getUserError,
  getUserStart,
  loginEnd,
  logoutEnd,
  registrationEnd,
} from "../actions";

export const initialState = {
  user: {
    email: "",
    password: "",
    name: "",
  },
  isAuthorized: false,
  isLoading: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registrationEnd, (state, action) => {
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
        isAuthorized: true,
      };
    })
    .addCase(loginEnd, (state, action) => {
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
        isAuthorized: true,
      };
    })
    .addCase(getUserStart, (state) => {
      return { ...state, isLoading: true };
    })
    .addCase(getUserEnd, (state, action) => {
      return {
        ...state,
        user: { ...initialState.user, ...action.payload.user },
        isLoading: false,
        isAuthorized: true,
      };
    })
    .addCase(getUserError, (state) => {
      return { ...state, isLoading: false };
    })
    .addCase(logoutEnd, (state, action) => {
      return initialState;
    });
});

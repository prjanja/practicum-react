import { createReducer } from "@reduxjs/toolkit";
import { userConstants } from "../action-types";

const initialState = {
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
    .addCase(userConstants.REGISTRATION_USER_FULFILLED, (state, action) => {
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
        isAuthorized: true,
      };
    })
    .addCase(userConstants.LOGIN_USER_FULFILLED, (state, action) => {
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
        isAuthorized: true,
      };
    })
    .addCase(userConstants.GET_USER_PENDING, (state) => {
      return { ...state, isLoading: true };
    })
    .addCase(userConstants.GET_USER_FULFILLED, (state, action) => {
      return {
        ...state,
        user: { ...initialState.user, ...action.payload.user },
        isLoading: false,
        isAuthorized: true,
      };
    })
    .addCase(userConstants.GET_USER_ERROR, (state) => {
      return { ...state, isLoading: false };
    })
    .addCase(userConstants.LOGOUT_USER_FULFILLED, (state, action) => {
      return initialState;
    });
});

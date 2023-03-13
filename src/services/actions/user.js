import { createAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  loginAPI,
  logoutAPI,
  registerAPI,
  userAPI,
} from "../../utils/endpoints";
import { request } from "../../utils/request";
import { userConstants } from "../action-types";

const registrationStart = createAction(userConstants.REGISTRATION_USER_PENDING);
const registrationEnd = createAction(userConstants.REGISTRATION_USER_FULFILLED);

const loginStart = createAction(userConstants.LOGIN_USER_PENDING);
const loginEnd = createAction(userConstants.LOGIN_USER_FULFILLED);

const logoutStart = createAction(userConstants.LOGOUT_USER_PENDING);
const logoutEnd = createAction(userConstants.LOGOUT_USER_FULFILLED);

const getUserStart = createAction(userConstants.GET_USER_PENDING);
const getUserEnd = createAction(userConstants.GET_USER_FULFILLED);
const getUserError = createAction(userConstants.GET_USER_ERROR);

export const registerAction = (user) => {
  return (dispatch) => {
    dispatch(registrationStart());

    return request(registerAPI, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
        dispatch(registrationEnd(res));
      })
      .catch((e) => {
        console.log(e?.message);
      });
  };
};

export const loginAction = (user) => {
  return (dispatch) => {
    dispatch(loginStart());

    return request(loginAPI, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setCookie("accessToken", res.accessToken);
      setCookie("refreshToken", res.refreshToken);
      dispatch(loginEnd(res));
    });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch(logoutStart());
    const token = getCookie("refreshToken");

    return request(logoutAPI, {
      method: "POST",
      body: JSON.stringify({
        token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(logoutEnd(res));
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .catch((e) => {
        console.log(e?.message);
      });
  };
};

export const getUserAction = () => {
  return (dispatch) => {
    const token = getCookie("accessToken");
    if(!token){
      return;
    }

    dispatch(getUserStart());

    return request(userAPI, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((res) => {
        dispatch(getUserEnd(res));
      })
      .catch((e) => {
        dispatch(getUserError(e));
      });
  };
};

export const updateUserAction = (user) => {
  return (dispatch) => {
    dispatch(getUserStart());
    const token = getCookie("accessToken");

    return request(userAPI, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        dispatch(getUserEnd(res));
      })
      .catch((e) => {
        console.log(e?.message);
      });
  };
};

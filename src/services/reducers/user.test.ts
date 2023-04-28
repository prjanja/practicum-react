import { userReducer, initialState } from "./user";
import { userConstants } from "../action-types";

const user = {
  email: "test@test.com",
  name: "test",
};

describe("User reducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle REGISTRATION_USER_FULFILLED", () => {
    expect(
      userReducer(initialState, {
        type: userConstants.REGISTRATION_USER_FULFILLED,
        payload: { user },
      })
    ).toEqual({
      ...initialState,
      isAuthorized: true,
      user: { ...initialState.user, ...user },
    });
  });
  it("should handle LOGIN_USER_FULFILLED", () => {
    expect(
      userReducer(initialState, {
        type: userConstants.LOGIN_USER_FULFILLED,
        payload: { user },
      })
    ).toEqual({
      ...initialState,
      isAuthorized: true,
      user: { ...initialState.user, ...user },
    });
  });
  it("should handle GET_USER_PENDING", () => {
    expect(
      userReducer(initialState, {
        type: userConstants.GET_USER_PENDING,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it("should handle GET_USER_FULFILLED", () => {
    expect(
      userReducer(initialState, {
        type: userConstants.GET_USER_FULFILLED,
        payload: { user },
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isAuthorized: true,
      user: { ...initialState.user, ...user },
    });
  });
  it("should handle GET_USER_ERROR", () => {
    expect(
      userReducer(initialState, {
        type: userConstants.GET_USER_ERROR,
      })
    ).toEqual({
      ...initialState,
      isAuthorized: false,
    });
  });
  it("should handle LOGOUT_USER_FULFILLED", () => {
    expect(
      userReducer(initialState, {
        type: userConstants.LOGOUT_USER_FULFILLED,
      })
    ).toEqual(initialState);
  });
});

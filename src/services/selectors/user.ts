import { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user;
export const selectIsUserAuthorized = (state: RootState) =>
  state.user.isAuthorized;
export const selectIsUserLoading = (state: RootState) => state.user.isLoading;

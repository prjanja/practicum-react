const BASE_URL = "https://norma.nomoreparties.space/api";

export const ingredientAPI = `${BASE_URL}/ingredients`;
export const orderAPI = `${BASE_URL}/orders`;
export const passwordResetAPI = `${BASE_URL}/password-reset`;
export const passwordChangeAPI = `${passwordResetAPI}/reset`;
export const loginAPI = `${BASE_URL}/auth/login`;
export const registerAPI = `${BASE_URL}/auth/register`;
export const logoutAPI = `${BASE_URL}/auth/logout`;
export const tokenRefreshAPI = `${BASE_URL}/auth/token`;
export const userAPI = `${BASE_URL}/auth/user`;

export const allFeedAPI = "wss://norma.nomoreparties.space/orders/all";
export const userFeedAPI = "wss://norma.nomoreparties.space/orders";

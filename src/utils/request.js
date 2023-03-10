import { getCookie, setCookie } from "./cookie";
import { tokenRefreshAPI } from "./endpoints";

const checkResponse = (response) => {
  if (!response.ok) {
    return response.json().then((err) => Promise.reject(err));
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) return response.json();

  return response;
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ответ не success: ${res}`);
};

const refreshToken = () => {
  const token = getCookie("refreshToken");

  return request(tokenRefreshAPI, {
    method: "POST",
    body: JSON.stringify({
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    setCookie("accessToken", res.accessToken);
    setCookie("refreshToken", res.refreshToken);
  });
};

export function request(url, options) {
  return fetch(url, options)
    .then(checkResponse)
    .then(checkSuccess)
    .catch((err) => {
      if (err.message === "jwt expired") {
        return refreshToken().then(() => request(url, options));
      }

      throw err;
    });
}

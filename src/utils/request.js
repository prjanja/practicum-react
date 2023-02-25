const checkResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(`Ошибка ${response.status}`);
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

export function request(url, options) {
  return fetch(url, options).then(checkResponse).then(checkSuccess);
}

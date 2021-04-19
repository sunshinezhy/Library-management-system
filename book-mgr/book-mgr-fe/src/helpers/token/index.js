const TOKEN_STORAGE_KEY = "_tt";

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
};

export const setToken = token => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  return token;
};

export const SPORTCRED_PREFIX = "sport-cred-app";

const createKey = (key) => `${SPORTCRED_PREFIX}:${key}`;

export const addItem = (key, value) => {
  localStorage.setItem(createKey(key), JSON.stringify(value));
  return getItem(key);
};

export const getItem = (key) => {
  const item = localStorage.getItem(createKey(key));
  return JSON.parse(item);
};

export const removeItem = (key) => {
  return localStorage.removeItem(createKey(key));
};

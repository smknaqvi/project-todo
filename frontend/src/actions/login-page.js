import { LOGIN_STARTED, LOGIN_SUCCEEDED, USER_KEY } from "../constants";
import { loginRequest } from "../api/login-page";
import { showError } from "./error";
import { addItem, removeItem } from "../utils/localStorage";

export const loginStarted = () => ({
  type: LOGIN_STARTED,
});

export const loginSuccess = (username, id) => ({
  type: LOGIN_SUCCEEDED,
  user: { username, id },
});

export function login(data) {
  return function (dispatch) {
    dispatch(loginStarted());
    return loginRequest(data)
      .then(function (response) {
        const { username, id } = addItem(USER_KEY, {
          username: response.data.displayName,
          id: response.data._id,
        });
        dispatch(loginSuccess(username, id));
      })
      .catch(function (error) {
        removeItem(USER_KEY);
        if (error.response) {
          dispatch(showError(error.response.data));
        } else if (error.request) {
          dispatch(showError("Unable to reach server"));
        } else {
          dispatch(showError("Internal server error"));
        }
      });
  };
}

import { LOGIN_STARTED, LOGIN_SUCCEEDED } from "../constants";
import { loginRequest } from "../api/login-page";
import { showError } from "./error";

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
        dispatch(loginSuccess(response.data.displayName, response.data._id));
      })
      .catch(function (error) {
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

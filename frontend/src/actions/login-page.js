import { LOGIN_STARTED, LOGIN_SUCCEEDED, LOGIN_FAILED } from "../constants";
import { loginRequest } from "../api/login-page";

export const loginStarted = () => ({
  type: LOGIN_STARTED,
});

export const loginSuccess = (username) => ({
  type: LOGIN_SUCCEEDED,
  username,
});

export const loginFailed = (reason) => ({
  type: LOGIN_FAILED,
  reason,
});

export function login(data) {
  return function (dispatch) {
    dispatch(loginStarted());
    return loginRequest(data)
      .then(function (response) {
        dispatch(loginSuccess(data.username));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(loginFailed(error.response.data));
        } else if (error.request) {
          dispatch(loginFailed("Unable to reach server"));
        } else {
          dispatch(loginFailed("Internal server error"));
        }
      });
  };
}

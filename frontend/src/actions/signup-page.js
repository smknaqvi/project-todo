import { SIGNUP_STARTED, SIGNUP_SUCCEEDED } from "../constants";
import { toggleAuthPage } from "./auth-page";
import { signupRequest } from "../api/signup-page";
import { showError } from "./error";

export const signupStarted = () => ({
  type: SIGNUP_STARTED,
});

export const signupSuccess = (username, id) => ({
  type: SIGNUP_SUCCEEDED,
  user: { username, id },
});

export function signup(data) {
  return function (dispatch) {
    dispatch(signupStarted());
    return signupRequest(data)
      .then(function (response) {
        dispatch(signupSuccess(response.data.displayName, response.data._id));
        dispatch(toggleAuthPage());
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

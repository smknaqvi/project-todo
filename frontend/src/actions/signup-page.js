import { SIGNUP_STARTED, SIGNUP_SUCCEEDED, USER_KEY } from "../constants";
import { toggleAuthPage } from "./auth-page";
import { signupRequest } from "../api/signup-page";
import { showError } from "./error";
import { addItem, removeItem } from "../utils/localStorage";

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
        const { username, id } = addItem(USER_KEY, {
          username: response.data.displayName,
          id: response.data._id,
        });
        dispatch(signupSuccess(username, id));
        dispatch(toggleAuthPage());
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

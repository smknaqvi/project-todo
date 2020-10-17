import { SIGNUP_FAILED, LOGIN_FAILED, CLOSE_ERROR } from "../constants";

import { Map } from "immutable";

const initState = Map({
  showError: false,
  errorReason: "",
});

export const error = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return state.set("showError", true).set("errorReason", action.reason);
    case CLOSE_ERROR:
      return state.set("showError", false).set("errorReason", "");
    default:
      return state;
  }
};

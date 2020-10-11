import { LOGIN_SUCCEEDED, SIGNUP_SUCCEEDED, LOGOUT } from "../constants";
import { Map } from "immutable";

const initState = Map({
  username: null,
});

export const auth = (state = initState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCEEDED:
    case LOGIN_SUCCEEDED:
      return state.set("username", action.username);
    case LOGOUT:
      return state.set("username", null);
    default:
      return state;
  }
};

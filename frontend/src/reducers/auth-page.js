import { TOGGLE_AUTH_PAGE } from "../constants";
import { Map } from "immutable";

const initState = Map({
  showSignup: false,
});

export const authPage = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_PAGE:
      return state.set("showSignup", !state.get("showSignup"));
    default:
      return state;
  }
};

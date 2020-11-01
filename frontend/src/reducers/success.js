import { SHOW_SUCCESS, CLOSE_SUCCESS } from "../constants";

import { Map } from "immutable";

const initState = Map({
  showSuccess: false,
  successReason: "",
});

export const success = (state = initState, action) => {
  switch (action.type) {
    case SHOW_SUCCESS:
      return state.set("showSuccess", true).set("successReason", action.reason);
    case CLOSE_SUCCESS:
      return state.set("showSuccess", false).set("successReason", "");
    default:
      return state;
  }
};

import { FETCH_ACS_SUCCEEDED, UPDATE_ACS_SUCCEEDED } from "../constants";
import { Map } from "immutable";

const initState = Map({
  currentUserACSScore: 0,
});

export const acs = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ACS_SUCCEEDED:
      return state.set("currentUserACSScore", action.acs);
    case UPDATE_ACS_SUCCEEDED:
      return state.set("currentUserACSScore", action.acs);
    default:
      return state;
  }
};

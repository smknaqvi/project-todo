import { FETCH_ACS_SUCCEEDED, UPDATE_ACS_SUCCEEDED } from "../constants";
import { Map } from "immutable";

const initState = Map({});

export const acs = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ACS_SUCCEEDED:
    case UPDATE_ACS_SUCCEEDED:
      return state
        .set("games", action.acs.games)
        .set("analysis", action.acs.analysis)
        .set("history", action.acs.history)
        .set("pPP", action.acs.pPP);
    default:
      return state;
  }
};

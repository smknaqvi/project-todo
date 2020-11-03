import { FETCH_PROFILE_SUCCEEDED } from "../constants";
import { Map } from "immutable";

const initState = Map({
  profile: {},
  fetchCompleted: false,
});

export const profile = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_SUCCEEDED:
      return state.set("profile", action.profile).set("fetchCompleted", true);
    default:
      return state;
  }
};

import { Map } from "immutable";
import { UPDATE_DEBATE_RESPONSE } from "../constants.js";

const initState = Map({
  response: "",
});

export const debateWritePage = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_DEBATE_RESPONSE:
      return state.set("response", action.response);
    default:
      return state;
  }
};

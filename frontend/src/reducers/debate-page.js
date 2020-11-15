import {
  UPDATE_DATE,
  FETCH_DEBATES_SUCCEEDED,
  FETCH_RESPONSES_SUCCEEDED,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  date: new Date(),
  debates: [],
  responses: [],
  curDebate: [],
});

export const debatePage = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_DATE:
      return state.set("date", action.date).set("curDebate", action.curDebate);
    case FETCH_RESPONSES_SUCCEEDED:
      return state.set("responses", action.responses);
    case FETCH_DEBATES_SUCCEEDED:
      return state.set("debates", action.debates);
    default:
      return state;
  }
};

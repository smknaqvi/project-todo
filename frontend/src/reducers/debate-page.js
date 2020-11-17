import {
  FETCH_DEBATES_SUCCEEDED,
  FETCH_RESPONSES_SUCCEEDED,
  UPDATE_CURRENT_DEBATE,
  UPDATE_RETRIEVED_CUR_DEBATE,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  date: new Date(),
  debates: [],
  responses: [],
  curDebate: [],
  retrievedCurDebate: false,
});

export const debatePage = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_RETRIEVED_CUR_DEBATE:
      return state.set("retrievedCurDebate", action.retrievedCurDebate);
    case UPDATE_CURRENT_DEBATE:
      return state
        .set("curDebate", action.curDebate)
        .set("retrievedCurDebate", true);
    case FETCH_RESPONSES_SUCCEEDED:
      return state.set("responses", action.responses);
    case FETCH_DEBATES_SUCCEEDED:
      return state.set("debates", action.debates);
    default:
      return state;
  }
};

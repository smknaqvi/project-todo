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
  assignedResponses: [],
  assignedResponsesContent: [],
  curResponse: [],
  retrievedAssignedResponses: false
});

export const debateViewPage = (state = initState, action) => {
  switch (action.type) {
    case FETCH_RESPONSES_SUCCEEDED:
      return state.set("responses", action.responses);
    case FETCH_ASSIGNED_RESPONSES_SUCCEEDED:
      return state.set(
        "assignedResponses",
        Array.from(new Set(action.assignedResponses.assignedResponses))
      );
    case FETCH_SINGLE_RESPONSE_SUCCEEDED:
      return state.set("curResponseObject", action.response);
    case FETCH_ASSIGNED_RESPONSES_OBJECTS_SUCCEEDED:
      return state
        .set("assignedResponsesObjects", action.responses)
        .set("assignedResponses", action.responseids)
        .set("retrievedAssignedResponses", action.responses.length > 0);
    case FETCH_DEBATES_SUCCEEDED:
      return state.set("debates", action.debates).set("retrievedAssignedResponses", false);
    case REMOVE_ASSIGNED_RESPONSES_SUCCEEDED:
      return state.set("assignedResponsesObjects", []);
    case EVALUATE_DEBATE_SUCCEEDED:
      return state.set("curDebate", action.curDebate);
    case UPDATE_DATE:
      return state.set("date", action.date).set("curDebate", action.curDebate);
    default:
      return state;
  }
};

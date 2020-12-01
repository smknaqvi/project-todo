import {
  FETCH_DEBATES_SUCCEEDED,
  FETCH_RESPONSES_SUCCEEDED,
  UPDATE_CURRENT_DEBATE,
  UPDATE_RETRIEVED_CUR_DEBATE,
  FETCH_ASSIGNED_RESPONSES_SUCCEEDED,
  FETCH_SINGLE_RESPONSE_SUCCEEDED,
  FETCH_ASSIGNED_RESPONSES_OBJECTS_SUCCEEDED,
  REMOVE_ASSIGNED_RESPONSES_SUCCEEDED,
  EVALUATE_DEBATE_SUCCEEDED,
  FETCH_PREV_DEBATE_SUCCEEDED,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  date: new Date(),
  debates: [],
  responses: [],
  curDebate: [],
  retrievedCurDebate: false,
  assignedResponses: [],
  curResponseObject: null,
  assignedResponsesObjects: [],
  retrievedAssignedResponses: false,
  fetchAssignedResponses: false,
  isCurDebateEvaluated: false,
  isShowingPrevDay: false,
  debateResponses: [],
});

export const debatePage = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_RETRIEVED_CUR_DEBATE:
      return state
        .set("retrievedCurDebate", action.retrievedCurDebate)
        .set("retrievedAssignedResponses", false);
    case UPDATE_CURRENT_DEBATE:
      const date =
        action.curDebate.length > 0
          ? new Date(action.curDebate[0].date)
          : new Date();
      return state
        .set("date", date)
        .set("curDebate", action.curDebate)
        .set("retrievedCurDebate", action.curDebate.length > 0)
        .set("retrievedAssignedResponses", false)
        .set("isShowingPrevDay", false);
    case FETCH_PREV_DEBATE_SUCCEEDED:
      return state
        .set("isShowingPrevDay", true)
        .set("debateResponses", action.responses);
    case FETCH_RESPONSES_SUCCEEDED:
      return state.set("responses", action.responses);
    case FETCH_ASSIGNED_RESPONSES_SUCCEEDED:
      return state
        .set(
          "assignedResponses",
          Array.from(new Set(action.assignedResponses.assignedResponses))
        )
        .set("fetchAssignedResponses", true);
    case FETCH_SINGLE_RESPONSE_SUCCEEDED:
      return state.set("curResponseObject", action.response);
    case FETCH_ASSIGNED_RESPONSES_OBJECTS_SUCCEEDED:
      return state
        .set("assignedResponsesObjects", action.responses)
        .set("assignedResponses", action.responseids)
        .set("retrievedAssignedResponses", action.responses.length > 0)
        .set("fetchAssignedResponses", true);
    case FETCH_DEBATES_SUCCEEDED:
      return state
        .set("debates", action.debates)
        .set("retrievedAssignedResponses", false);
    case REMOVE_ASSIGNED_RESPONSES_SUCCEEDED:
      return state.set("assignedResponsesObjects", []);
    case EVALUATE_DEBATE_SUCCEEDED:
      return state.set("curDebate", action.curDebate);
    default:
      return state;
  }
};

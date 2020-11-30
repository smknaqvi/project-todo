import {
  FETCH_BRACKETS_STARTED,
  FETCH_BRACKETS_SUCCEEDED,
  FETCH_USER_BRACKET_CHOICES_STARTED,
  FETCH_USER_BRACKET_CHOICES_SUCCEEDED,
  SET_SELECTED_TEAM,
  SET_SELECTED_SCORE,
  STARTED,
  SUCCEEDED,
  UNINITIALIZED,
  UPDATE_BRACKETS_STARTED,
  UPDATE_BRACKETS_SUCCEEDED,
  SET_BRACKET_UPDATE,
  GET_TEAM_IMAGE_SUCCEEDED,
} from "../constants";
import { Map, List } from "immutable";

const initState = Map({
  fetchBracketsApiStatus: UNINITIALIZED,
  fetchUserChoicesApiStatus: UNINITIALIZED,
  updateApiStatus: UNINITIALIZED,
  userBracketChoices: Map({}),
  brackets: List(),
  teamImages: Map({}),
});

export const playoffs = (state = initState, action) => {
  switch (action.type) {
    case FETCH_BRACKETS_STARTED:
      return state.set("fetchBracketsApiStatus", STARTED);
    case FETCH_BRACKETS_SUCCEEDED:
      return state
        .set("brackets", List(action.brackets))
        .set("fetchBracketsApiStatus", SUCCEEDED);
    case FETCH_USER_BRACKET_CHOICES_STARTED:
      return state.set("fetchUserChoicesApiStatus", STARTED);
    case FETCH_USER_BRACKET_CHOICES_SUCCEEDED:
      return state
        .set("userBracketChoices", Map(action.userBracketChoices))
        .set("fetchUserChoicesApiStatus", SUCCEEDED);
    case SET_BRACKET_UPDATE:
      return state.mergeDeep({
        userBracketChoices: { [action.bracket.matchNumber]: action.bracket },
      });
    case UPDATE_BRACKETS_STARTED:
      return state.set("updateApiStatus", STARTED);
    case UPDATE_BRACKETS_SUCCEEDED:
      return state.set("updateApiStatus", SUCCEEDED);
    case GET_TEAM_IMAGE_SUCCEEDED:
      return state.set("teamImages", Map(action.teamImages));
    case SET_SELECTED_TEAM:
      return state.setIn(
        [
          "userBracketChoices",
          `${action.payload.matchNumber}`,
          action.payload.teamKey,
        ],
        action.payload.selectedTeam
      );
    case SET_SELECTED_SCORE:
      return state.setIn(
        [
          "userBracketChoices",
          `${action.payload.matchNumber}`,
          action.payload.teamKey,
        ],
        action.payload.selectedScore
      );
    default:
      return state;
  }
};

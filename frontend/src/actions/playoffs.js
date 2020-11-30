import {
  FETCH_BRACKETS_STARTED,
  FETCH_BRACKETS_SUCCEEDED,
  FETCH_USER_BRACKET_CHOICES_STARTED,
  FETCH_USER_BRACKET_CHOICES_SUCCEEDED,
  UPDATE_BRACKETS_STARTED,
  UPDATE_BRACKETS_SUCCEEDED,
  SET_SELECTED_TEAM,
  SET_SELECTED_SCORE,
  SET_BRACKET_UPDATE,
  GET_TEAM_IMAGE_STARTED,
  GET_TEAM_IMAGE_SUCCEEDED,
} from "../constants";
import {
  bracketsRequest,
  userBracketChoicesRequest,
  putBracket,
  postBracket,
} from "../api/playoffs";
import { playerRequest } from "../api/team";
import { showError } from "./error";
import { showSuccess } from "./success";

export const bracketsRequestStarted = () => ({
  type: FETCH_BRACKETS_STARTED,
});

export const bracketsRequestSuccess = (brackets) => ({
  type: FETCH_BRACKETS_SUCCEEDED,
  brackets,
});

export function getBrackets(year) {
  return function (dispatch) {
    dispatch(bracketsRequestStarted());
    return bracketsRequest(year)
      .then(function (response) {
        dispatch(bracketsRequestSuccess(response.data));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(showError(error.response.data));
        } else if (error.request) {
          dispatch(showError("Unable to reach server"));
        } else {
          dispatch(showError("Internal server error"));
        }
      });
  };
}

export const userBracketChoicesRequestStarted = () => ({
  type: FETCH_USER_BRACKET_CHOICES_STARTED,
});

export const userBracketChoicesRequestSuccess = (userBracketChoices) => ({
  type: FETCH_USER_BRACKET_CHOICES_SUCCEEDED,
  userBracketChoices,
});

export function getUserBracketChoices(userId) {
  return function (dispatch) {
    dispatch(userBracketChoicesRequestStarted());
    return userBracketChoicesRequest(userId)
      .then(function (response) {
        const userBracketChoices = response.data.reduce(
          (acc, bracket) => ({ ...acc, [bracket.matchNumber]: bracket }),
          {}
        );
        dispatch(userBracketChoicesRequestSuccess(userBracketChoices));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(showError(error.response.data));
        } else if (error.request) {
          dispatch(showError("Unable to reach server"));
        } else {
          dispatch(showError("Internal server error"));
        }
      });
  };
}

export const bracketsUpdateStarted = () => ({
  type: UPDATE_BRACKETS_STARTED,
});

export const bracketsUpdateSuccess = () => ({
  type: UPDATE_BRACKETS_SUCCEEDED,
});

export const setBracketUpdate = (bracket) => ({
  type: SET_BRACKET_UPDATE,
  bracket,
});

export function updateBrackets(numBrackets, brackets) {
  return function (dispatch) {
    function* dispatchOnUpdateCompleteGen(data) {
      for (let i = 1; i < numBrackets; i++) {
        yield i;
      }
      dispatch(showSuccess("Saved brackets!"));
      return dispatch(bracketsUpdateSuccess(data));
    }

    const dispatchOnUpdateComplete = dispatchOnUpdateCompleteGen();
    dispatch(bracketsUpdateStarted());
    brackets.every((bracket) => {
      const updateBracket = bracket._id ? putBracket : postBracket;
      return updateBracket(bracket)
        .then(function (response) {
          dispatch(setBracketUpdate(response.data));
          dispatchOnUpdateComplete.next();
          return true;
        })
        .catch(function (error) {
          if (error.response) {
            dispatch(showError(error.response.data));
          } else if (error.request) {
            dispatch(showError("Unable to reach server"));
          } else {
            dispatch(showError("Internal server error"));
          }
          return false;
        });
    });
  };
}

export const teamImageStarted = () => ({
  type: GET_TEAM_IMAGE_STARTED,
});

export const teamImageSuccess = (teamImages) => ({
  type: GET_TEAM_IMAGE_SUCCEEDED,
  teamImages,
});

export function getTeamImages() {
  return function (dispatch) {
    dispatch(teamImageStarted());
    return playerRequest()
      .then(function (response) {
        let TeamImages = {};
        response.data.forEach((team) => {
          TeamImages[team.abbrName] = team.picture;
        });
        dispatch(teamImageSuccess(TeamImages));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(showError(error.response.data));
        } else if (error.request) {
          dispatch(showError("Unable to reach server"));
        } else {
          dispatch(showError("Internal server error"));
        }
      });
  };
}

export const setSelectedTeam = (matchNumber, teamKey, selectedTeam) => ({
  type: SET_SELECTED_TEAM,
  payload: { matchNumber, teamKey, selectedTeam },
});

export const setSelectedScore = (matchNumber, teamKey, selectedScore) => ({
  type: SET_SELECTED_SCORE,
  payload: { matchNumber, teamKey, selectedScore },
});

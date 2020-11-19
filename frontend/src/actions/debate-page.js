import {
  FETCH_DEBATES_FAILED,
  FETCH_DEBATES_STARTED,
  FETCH_DEBATES_SUCCEEDED,
  FETCH_RESPONSES_FAILED,
  FETCH_RESPONSES_STARTED,
  FETCH_RESPONSES_SUCCEEDED,
  UPDATE_RETRIEVED_CUR_DEBATE,
  FETCH_ASSIGNED_RESPONSES_SUCCEEDED,
  FETCH_ASSIGNED_RESPONSES_STARTED,
  FETCH_SINGLE_RESPONSE_SUCCEEDED,
  FETCH_SINGLE_RESPONSE_STARTED,
  FETCH_SINGLE_DEBATE_STARTED,
  FETCH_SINGLE_DEBATE_SUCCEEDED,
  EVALUATE_DEBATE_STARTED,
  EVALUATE_DEBATE_SUCCEEDED,
  FETCH_ASSIGNED_RESPONSES_OBJECTS_STARTED,
  FETCH_ASSIGNED_RESPONSES_OBJECTS_SUCCEEDED,
  UPDATE_RESPONSE_STARTED,
  UPDATE_RESPONSE_SUCCEEDED,
} from "../constants";
import { showSuccess } from "./success";
import { updateCurrentDebate } from "./debate-write-page";
import { getACS } from "./acs";
import {
  getAllDebates,
  getDebateByUserId,
  getAssignedResponses,
  getResponsesByID,
  getDebate,
  getResponsesByIDs,
  putDebate,
  putResponseRating,
} from "../api/debate";
import { getDebateResponses } from "../api/debate-responses";
import { getProfileInfo, getProfileInfoForIds } from "../api/my-profile";
import { putUpdatedAcs } from "../api/acs";
import { showError } from "./error";
import { compareDates } from "../utils/dateUtils";

export const debateRequestStarted = () => ({
  type: FETCH_DEBATES_STARTED,
});

export const debateRequestSucceeded = (debates) => ({
  type: FETCH_DEBATES_SUCCEEDED,
  debates,
});

export const debateRequestFailed = () => ({
  type: FETCH_DEBATES_FAILED,
});

export const responseRequestFailed = () => ({
  type: FETCH_RESPONSES_FAILED,
});

export const responseRequestStarted = () => ({
  type: FETCH_RESPONSES_STARTED,
});

export const updateRetrievedCurDebate = (retrievedCurDebate) => ({
  type: UPDATE_RETRIEVED_CUR_DEBATE,
  retrievedCurDebate,
});

export const responseRequestSucceeded = (responses) => ({
  type: FETCH_RESPONSES_SUCCEEDED,
  responses,
});

export const assignedResponseRequestStarted = () => ({
  type: FETCH_ASSIGNED_RESPONSES_STARTED,
});

export const assignedResponseRequestSucceeded = (responses) => ({
  type: FETCH_ASSIGNED_RESPONSES_SUCCEEDED,
  assignedResponses: responses,
});

export const singleRsponseRequestStarted = () => ({
  type: FETCH_SINGLE_RESPONSE_STARTED,
});

export const singleRsponseRequestSucceeded = (response) => ({
  type: FETCH_SINGLE_RESPONSE_SUCCEEDED,
  response: response,
});

export const singleDebateRequestStarted = () => ({
  type: FETCH_SINGLE_DEBATE_STARTED,
});

export const RequestSucceeded = (winner) => ({
  type: FETCH_SINGLE_DEBATE_SUCCEEDED,
  winner: winner,
});

export const getAssignedResponsesRequestStarted = () => ({
  type: FETCH_ASSIGNED_RESPONSES_OBJECTS_STARTED,
});

export const getAssignedResponsesRequestSucceeded = (
  responses,
  responseids
) => ({
  type: FETCH_ASSIGNED_RESPONSES_OBJECTS_SUCCEEDED,
  responses: responses,
  responseids: responseids,
});

export const evaluateDebateSucceeded = (curDebate) => ({
  type: EVALUATE_DEBATE_SUCCEEDED,
  curDebate: curDebate,
});
export const evaluateDebateStarted = () => ({
  type: EVALUATE_DEBATE_STARTED,
});

export const updateResponseSucceeded = () => ({
  type: UPDATE_RESPONSE_SUCCEEDED,
});
export const updateResponseStarted = () => ({
  type: UPDATE_RESPONSE_STARTED,
});

export function getDebatesByUserId(id) {
  return function (dispatch) {
    dispatch(debateRequestStarted());
    return getDebateByUserId(id)
      .then(function (response) {
        dispatch(debateRequestSucceeded(response.data));
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

export function getDebates() {
  return function (dispatch) {
    dispatch(debateRequestStarted());
    return getAllDebates()
      .then(function (response) {
        dispatch(debateRequestSucceeded(response.data));
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

export function getDebatesFromUserIdAndDate(date, id) {
  return function (dispatch) {
    return getDebateByUserId(id)
      .then(function (response) {
        const debates = response.data;
        const curDebate = debates.filter((debate) => {
          return compareDates(debate.date, date);
        });
        dispatch(updateCurrentDebate(curDebate));
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

export function getAssignedResponsesByIDs(id) {
  return function (dispatch) {
    dispatch(getAssignedResponsesRequestStarted());
    getAssignedResponses(id)
      .then(function (responseids) {
        const uniqueIds = Array.from(
          new Set(responseids.data.assignedResponses)
        );
        return getResponsesByIDs(uniqueIds).then(function (response) {
          const allResponses = response.data;
          let listOfUsers = [];
          allResponses.forEach((response) => {
            listOfUsers = [...listOfUsers, response.user];
          });
          getProfileInfoForIds(listOfUsers).then(function (userprofiles) {
            let listOfResponses = [];
            userprofiles.data.forEach((user) => {
              allResponses.forEach((response) => {
                if (user._id === response.user) {
                  response.userName = user.displayName;
                  listOfResponses = [...listOfResponses, response];
                }
              });
            });
            dispatch(
              getAssignedResponsesRequestSucceeded(listOfResponses, uniqueIds)
            );
          });
        });
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

export function getResponses() {
  return function (dispatch) {
    dispatch(responseRequestStarted());
    return getDebateResponses()
      .then(function (response) {
        dispatch(responseRequestSucceeded(response.data));
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

export function getUserResponsesByID(id) {
  return function (dispatch) {
    dispatch(singleRsponseRequestStarted());
    return getResponsesByID(id)
      .then(function (response) {
        dispatch(singleRsponseRequestSucceeded(response.data));
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

export function updateRating(responseId, value, userId) {
  return function (dispatch) {
    dispatch(updateResponseStarted());
    return getResponsesByID(responseId)
      .then(function (response) {
        putResponseRating(responseId, userId, value).then(function (response) {
          dispatch(updateResponseSucceeded());
          dispatch(showSuccess("Rating has been submitted"));
        });
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

export function evaluateDebate(userId, id, date) {
  return function (dispatch) {
    dispatch(evaluateDebateStarted());
    return getDebate(id)
      .then(function (response) {
        const curDebate = response.data;
        getResponsesByIDs(response.data.responseIds).then(function (responses) {
          let highestAvg = 0;
          let useridofhighestavg = "";
          let score = 0;
          let userScoreMap = {};
          responses.data.forEach((response) => {
            const ratings = response.ratings;
            let sum = 0;

            if (Object.keys(ratings).length > 0) {
              Object.values(ratings).forEach((rating) => {
                sum += rating;
              });
              const avg = sum / Object.values(ratings).length;
              if (avg > highestAvg) {
                highestAvg = avg;
                useridofhighestavg = response.user;
              }
              score = avg / 10;
              score = Math.ceil(parseInt(score));
              if (score === 0) {
                score++;
              }
              userScoreMap[response.user] = score;
            }
            score = highestAvg / 10;
            score = Math.ceil(parseInt(score));
            userScoreMap[useridofhighestavg] = score + 5;
          });
          curDebate.winner = useridofhighestavg;
          curDebate.isEvaluated = true;
          putDebate(curDebate).then((debate) => {
            dispatch(evaluateDebateSucceeded([debate.data]));
            for (const [key, value] of Object.entries(userScoreMap)) {
              if (key.length > 0) {
                getProfileInfo(key).then((user) => {
                  putUpdatedAcs(key, "DEBATE", user.data[0].acs + value).then(
                    () => {
                      if (key === userId) {
                        dispatch(getACS(userId));
                      }
                    }
                  );
                });
              }
              dispatch(showSuccess("Debate has been successfully evaluated!"));
            }
          });
        });
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

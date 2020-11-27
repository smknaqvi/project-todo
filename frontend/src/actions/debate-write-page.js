import {
  UPDATE_DEBATE_RESPONSE,
  UPDATE_CURRENT_DEBATE,
  FETCH_TWO_ASSIGNED_RESPONSES_STARTED,
} from "../constants";
import { postDebateResponses } from "../api/debate-responses";
import { getDebateQuestionByTier } from "../api/debate-question";
import {
  getAssignedResponses,
  getResponsesByIDs,
  putDebate,
  updateRatingCount,
  updateAssignedResponses,
  getDebateByTier,
} from "../api/debate";
import { showSuccess } from "./success";
import {
  getDebatesByUserId,
  updateRetrievedCurDebate,
  getDebatesFromUserIdAndDate,
  getAssignedResponsesByIDs,
} from "./debate-page";
import { showError } from "./error";
import { getResponses } from "./debate-page";
import { compareDates } from "../utils/dateUtils";
export const updateDebateResponses = (response) => ({
  type: UPDATE_DEBATE_RESPONSE,
  response,
});

export const updateCurrentDebate = (curDebate) => ({
  type: UPDATE_CURRENT_DEBATE,
  curDebate,
});

export const fetchTwoAssignedResponses = () => ({
  type: FETCH_TWO_ASSIGNED_RESPONSES_STARTED,
});

export function getTwoAssignedResponses(id, myresponseid, debate) {
  return function (dispatch) {
    dispatch(fetchTwoAssignedResponses());
    const notMyResponses = debate.responseIds.filter((responseid) => {
      return responseid !== myresponseid._id;
    });
    getResponsesByIDs(Array.from(new Set(notMyResponses)))
      .then(function (responseobjs) {
        getAssignedResponses(id).then(function (allids) {
          let lowest = responseobjs.data[0];
          let second = responseobjs.data[1];
          if (responseobjs.data.length > 1) {
            if (lowest.count > second.count) {
              lowest = second;
              second = responseobjs.data[0];
            }
            let alreadyExists = false;
            responseobjs.data.forEach((response) => {
              if (allids.data.assignedResponses.includes(response._id)) {
                alreadyExists = true;
              }
              if (response.count < lowest.count) {
                second = lowest;
                lowest = response;
              } else if (response.count < second.count) {
                if (response.user !== lowest.user) {
                  second = response;
                }
              }
            });
            if (
              !alreadyExists &&
              (allids.data.assignedResponses.length === 0 ||
                !(
                  allids.data.assignedResponses.includes(lowest._id) &&
                  allids.data.assignedResponses.includes(second._id)
                ))
            ) {
              updateRatingCount(lowest._id, lowest.count + 1);
              updateRatingCount(second._id, second.count + 1);
              updateAssignedResponses(lowest._id, id).then(function () {
                updateAssignedResponses(second._id, id).then(function () {
                  dispatch(getAssignedResponsesByIDs(id));
                });
              });
            } else {
              dispatch(getAssignedResponsesByIDs(id));
            }
          }
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

export function uploadResponseAndSaveToDebate(debate, response) {
  return function (dispatch) {
    return postDebateResponses(response.user, response.content, response.date)
      .then((response) => {
        debate.responseIds.push(response.data._id);
        // Save to the debate
        return putDebate(debate);
      })
      .then(() => {
        dispatch(showSuccess("Uploaded Debate Response"));
        // Retrieve the updated debates and responses from DB to update state
        return (
          dispatch(updateDebateResponses("")) &&
          dispatch(getDebatesByUserId(response.user)) &&
          dispatch(getResponses()) &&
          dispatch(updateCurrentDebate([debate])) &&
          dispatch(getDebatesFromUserIdAndDate(debate.date, response.user)) &&
          dispatch(getAssignedResponsesByIDs(response.user))
          
        );
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

export function getAvailableDebates(date, tier, userid) {
  return function (dispatch) {
    return getDebateByTier(tier)
      .then(function (response) {
        const curDebate = response.data.filter((debate) => {
          return (
            // Check that their dates align but the user is not apart of this debate
            compareDates(debate.date, date)
          );
        });
        return curDebate;
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

export function populateDebate(date, tier, userid) {
  return function (dispatch) {
    return dispatch(getAvailableDebates(date, tier, userid))
      .then(function (response) {
        // here my response should be a non-empty array if a debate was found
        if (response.length > 0) {
          // Find the debate with the least amount of participants
          const minParticipatingDebate = response.reduce((prev, cur) => {
            return prev.debaterIds.length <= cur.debaterIds.length ? prev : cur;
          });
          // Add myself to the debate and update the DB and my state
          minParticipatingDebate.debaterIds.push(userid);
          minParticipatingDebate.debaterIds = Array.from(
            new Set(minParticipatingDebate.debaterIds));
          return putDebate(minParticipatingDebate).then((response) => {
            /* retrieve the new debates from state which should now include the 
            debate we just updated to include user */
            return (
              dispatch(getDebatesByUserId(userid)) &&
              dispatch(updateCurrentDebate([response.data]))
            );
          });
        } else {
          return getDebateQuestionByTier(tier).then((response) => {
            if (response.data.length !== 0) {
              const availableQuestions = response.data;
              /* Obtain a random question. Used https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range to figure out generating random int */
              const randomQuestion =
                response.data[
                  Math.floor(Math.random() * availableQuestions.length)
                ];
              const newDebate = {
                tier: tier,
                question: randomQuestion.question,
                debaterIds: [userid],
                responseIds: [],
                date: date,
              };
              dispatch(updateCurrentDebate([newDebate]));
            } else {
              dispatch(updateRetrievedCurDebate(true));
            }
          });
        }
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

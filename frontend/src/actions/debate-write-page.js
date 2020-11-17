import { UPDATE_DEBATE_RESPONSE, UPDATE_CURRENT_DEBATE } from "../constants";
import { postDebateResponses } from "../api/debate-responses";
import { getDebateQuestionByTier } from "../api/debate-question";
import { getDebateByTier } from "../api/debate";
import { getDebatesByUserId, updateRetrievedCurDebate } from "./debate-page";
import { showError } from "./error";
import { putDebate } from "../api/debate";
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

export function uploadResponseAndSaveToDebate(debate, response) {
  return function (dispatch) {
    return postDebateResponses(response.user, response.content, response.date)
      .then((response) => {
        // Save the id into the debates
        debate.responseIds.push(response.data._id);
        // Save to the debate
        return putDebate(debate);
      })
      .then(() => {
        // Retrieve the updated debates and responses from DB to update state
        return (
          dispatch(getDebatesByUserId(response.user)) &&
          dispatch(getResponses()) &&
          dispatch(updateCurrentDebate(debate))
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
            compareDates(debate.date, date) &&
            !debate.debaterIds.includes(userid)
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
    // We are going to update curDebate again so we set the bool to false
    dispatch(updateRetrievedCurDebate(false));
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
          return putDebate(minParticipatingDebate).then((response) => {
            /* retrieve the new debates from state which should now include the 
            debate we just updated to include user */
            return (
              dispatch(getDebatesByUserId(userid)) &&
              dispatch(updateCurrentDebate([response.data]))
            );
          });
        } else {
          // We need to create a new debate. First, find a question from my tier
          return getDebateQuestionByTier(tier).then((response) => {
            const availableQuestions = response.data;
            /* Obtain a random question. Used https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range to figure out generating random int */
            const randomQuestion =
              response.data[
                Math.floor(Math.random() * availableQuestions.length)
              ];
            // now create a debate with the question and the userid and push to DB
            const newDebate = {
              tier: tier,
              question: randomQuestion.question,
              debaterIds: [userid],
              responseIds: [],
              date: date,
            };
            //return postDebate(newDebate);
            dispatch(updateCurrentDebate([newDebate]));
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

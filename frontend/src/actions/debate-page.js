import {
  FETCH_DEBATES_FAILED,
  FETCH_DEBATES_STARTED,
  FETCH_DEBATES_SUCCEEDED,
  FETCH_RESPONSES_FAILED,
  FETCH_RESPONSES_STARTED,
  FETCH_RESPONSES_SUCCEEDED,
  UPDATE_RETRIEVED_CUR_DEBATE,
} from "../constants";
import { updateCurrentDebate } from "./debate-write-page";
import { getAllDebates, getDebateByUserId } from "../api/debate";
import { getDebateResponses } from "../api/debate-responses";
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
    dispatch(updateRetrievedCurDebate(false));
    return getDebateByUserId(id)
      .then(function (response) {
        const curDebate = response.data.filter((debate) => {
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

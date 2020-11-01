import {
  SEND_PREDICTS_STARTED,
  SEND_PREDICTS_SUCCEEDED,
  GET_PREDICTS_STARTED,
  GET_PREDICTS_FAILED,
  GET_PREDICTS_SUCCEEDED,
  GET_WINNERS_STARTED,
  GET_WINNERS_SUCCEEDED,
  GET_WINNERS_FAILED,
} from "../constants";
import {
  postPredictions,
  putPredictions,
  getPredictions,
} from "../api/predictions";
import { getWinners } from "../api/winners";
import { showError } from "./error";
import { showSuccess } from "./success";

export const getWinnersStarted = () => ({
  type: GET_WINNERS_STARTED,
});
export const getWinnersFailed = () => ({
  type: GET_WINNERS_FAILED,
});

export const getWinnersSuccess = (winners) => ({
  type: GET_WINNERS_SUCCEEDED,
  winners: winners,
});

export const getPredictsStarted = () => ({
  type: GET_PREDICTS_STARTED,
});
export const sendPredictsStarted = () => ({
  type: SEND_PREDICTS_STARTED,
});

export const sendPredictsSuccess = (picks, results, isEvaluated) => ({
  type: SEND_PREDICTS_SUCCEEDED,
  picks,
  results,
  isEvaluated,
});

export const getPredictsFailed = () => ({
  type: GET_PREDICTS_FAILED,
});

export const getPredictsSuccess = (picks, results, isEvaluated) => ({
  type: GET_PREDICTS_SUCCEEDED,
  picks,
  results,
  isEvaluated,
});

export function getPicksFromDB(userid) {
  return function (dispatch) {
    dispatch(getPredictsStarted());
    return getPredictions(userid)
      .then(function (response) {
        if (response.data !== null) {
          dispatch(
            getPredictsSuccess(
              response.data.picks,
              response.data.results,
              response.data.isEvaluated
            )
          );
        } else {
          dispatch(getPredictsFailed());
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
export function getWinnersFromDB(year) {
  return function (dispatch) {
    dispatch(getWinnersStarted());
    return getWinners(year)
      .then(function (response) {
        dispatch(getWinnersSuccess(response.data));
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
export function sendPicksToDB(
  year,
  userid,
  data,
  results,
  madePicks,
  isEvaluated
) {
  return function (dispatch) {
    dispatch(sendPredictsStarted());
    const upsertPick = madePicks ? putPredictions : postPredictions;
    return upsertPick(year, userid, data, results ? results : {}, isEvaluated)
      .then(function (response) {
        dispatch(
          sendPredictsSuccess(
            response.data.picks,
            response.data.results,
            response.data.isEvaluated
          )
        );
        dispatch(showSuccess("Saved Predictions!"));
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

import {
  FETCH_ACS_STARTED,
  FETCH_ACS_SUCCEEDED,
  UPDATE_ACS_STARTED,
  UPDATE_ACS_SUCCEEDED,
} from "../constants";
import { acsRequest, putUpdatedAcs } from "../api/acs";
import { showError } from "./error";

export const acsRequestStarted = () => ({
  type: FETCH_ACS_STARTED,
});

export const acsRequestSuccess = (acs) => ({
  type: FETCH_ACS_SUCCEEDED,
  acs,
});

export function getACS(id) {
  return function (dispatch) {
    dispatch(acsRequestStarted());
    return acsRequest(id)
      .then(function (response) {
        dispatch(acsRequestSuccess(response.data.acs));
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

export const updateACSStarted = () => ({
  type: UPDATE_ACS_STARTED,
});

export const updateACSSuccess = (acs) => ({
  type: UPDATE_ACS_SUCCEEDED,
  acs,
});

export function updateACS(id, type, updatedACS) {
  return function (dispatch) {
    dispatch(updateACSStarted());
    return putUpdatedAcs(id, type, updatedACS)
      .then(function (response) {
        dispatch(updateACSSuccess(response.data.acs));
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

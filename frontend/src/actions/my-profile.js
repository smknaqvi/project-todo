import {
  FETCH_PROFILE_STARTED,
  FETCH_PROFILE_SUCCEEDED,
  UPDATE_PROFILE_SUCCEEDED,
  UPDATE_PROFILE_STARTED,
} from "../constants";
import { getProfileInfo, updateProfileRequest } from "../api/my-profile";
import { showError } from "./error";
import { showSuccess } from "./success";
export const updateProfileStarted = () => ({
  type: UPDATE_PROFILE_STARTED,
});

export const updateProfileSuccess = (username, id) => ({
  type: UPDATE_PROFILE_SUCCEEDED,
  user: { username, id },
});

export const myProfileRequestStarted = () => ({
  type: FETCH_PROFILE_STARTED,
});

export const myProfileRequestSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCEEDED,
  profile,
});

export function profileInfoRequest(id) {
  return function (dispatch) {
    dispatch(myProfileRequestStarted());
    return getProfileInfo(id)
      .then(function (response) {
        dispatch(myProfileRequestSuccess(response.data[0]));
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
export function updateProfile(id, data) {
  return function (dispatch) {
    dispatch(updateProfileStarted());

    return updateProfileRequest(id, data)
      .then(function (response) {
        dispatch(
          updateProfileSuccess(response.data.displayName, response.data._id)
        );
        dispatch(showSuccess("Profile Info updated!"));
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

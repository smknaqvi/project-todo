import {
  UPLOAD_PHOTO_STARTED,
  UPLOAD_PHOTO_SUCCEEDED,
  SET_PROFILE_PHOTO_SUCCEEDED,
  SET_PROFILE_PHOTO_STARTED,
  INIT_PHOTO_STARTED,
  INIT_PHOTO_SUCCEEDED,
} from "../constants";
import { uploadProfilePhotoRequest, getProfileInfo } from "../api/my-profile";
import { showError } from "./error";
import { fileToBase64 } from "../utils/fileToBase64";
import { showSuccess } from "./success";

export const setProfilePhotoStarted = () => ({
  type: SET_PROFILE_PHOTO_STARTED,
});

export const setProfilePhotoSucceeded = (picture) => ({
  type: SET_PROFILE_PHOTO_SUCCEEDED,
  picture,
});

export const uploadPhotoStarted = () => ({
  type: UPLOAD_PHOTO_STARTED,
});

export const uploadPhotoSuccess = (picture) => ({
  type: UPLOAD_PHOTO_SUCCEEDED,
  picture,
});

export const initProfilePhotoStarted = (picture) => ({
  type: INIT_PHOTO_STARTED,
  picture,
});

export const initProfilePhotoSucceeded = (picture) => ({
  type: INIT_PHOTO_SUCCEEDED,
  picture,
});

export function initProfilePhoto(id) {
  return function (dispatch) {
    dispatch(initProfilePhotoStarted());
    return getProfileInfo(id)
      .then(function (profilePhoto) {
        dispatch(initProfilePhotoSucceeded(profilePhoto.data[0].picture));
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

export function setBase64Image(file) {
  return function (dispatch) {
    dispatch(setProfilePhotoStarted());
    fileToBase64(file)
      .then(function (profilePhoto) {
        dispatch(setProfilePhotoSucceeded(profilePhoto.split(",")[1]));
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

export function uploadPhoto(data) {
  return function (dispatch) {
    dispatch(uploadPhotoStarted());
    return uploadProfilePhotoRequest(data.userId, data.profilePhoto)
      .then(function (response) {
        dispatch(uploadPhotoSuccess(response.data));
        dispatch(showSuccess("Profile Photo updated!"));
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

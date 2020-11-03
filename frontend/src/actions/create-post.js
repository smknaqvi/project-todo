import {
  ADD_POST_STARTED,
  ADD_POST_SUCCEEDED,
  SET_CONTENT,
  SET_BASE64_IMAGE_STARTED,
  SET_BASE64_IMAGE_SUCCEEDED,
  CLEAR_BASE64_IMAGE,
  ADD_POST_FAILED,
} from "../constants";
import { uploadPost } from "../api/posts";
import { showError } from "./error";
import { fileToBase64 } from "../utils/fileToBase64";
import { mapPost } from "../operators/mapPosts";

export const addPostStarted = () => ({
  type: ADD_POST_STARTED,
});

export const addPostSuccess = (post) => ({
  type: ADD_POST_SUCCEEDED,
  post,
});

export const addPostFailed = () => ({
  type: ADD_POST_FAILED,
});

export function addPost(data) {
  return function (dispatch) {
    dispatch(addPostStarted());
    return uploadPost(data)
      .then(function (response) {
        const post = mapPost(response.data);
        dispatch(addPostSuccess(post));
      })
      .catch(function (error) {
        dispatch(addPostFailed());
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
    dispatch(setBase64ImageStarted());
    fileToBase64(file)
      .then(function (base64Image) {
        dispatch(setBase64ImageSucceeded(base64Image.split(",")[1]));
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

export const setBase64ImageStarted = () => ({
  type: SET_BASE64_IMAGE_STARTED,
});

export const setBase64ImageSucceeded = (picture) => ({
  type: SET_BASE64_IMAGE_SUCCEEDED,
  picture,
});

export const clearBase64Image = () => ({
  type: CLEAR_BASE64_IMAGE,
});

export const setContent = (content) => ({
  type: SET_CONTENT,
  content,
});

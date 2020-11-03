import {
  ADD_COMMENT_STARTED,
  ADD_COMMENT_SUCCEEDED,
  SET_COMMENT,
} from "../constants";
import { uploadOCComment } from "../api/opencourt-timeline";
import { showError } from "./error";
import { mapComments } from "../operators/mapPosts";

export const addCommentStarted = (postId) => ({
  type: ADD_COMMENT_STARTED,
  pid: postId,
});

export const addCommentSuccess = (postId, comments) => ({
  type: ADD_COMMENT_SUCCEEDED,
  payload: { pid: postId, comments },
});

export function addComment(postId, curUserId, comment) {
  return function (dispatch) {
    dispatch(addCommentStarted(postId));
    return uploadOCComment(postId, curUserId, comment)
      .then(function (response) {
        dispatch(
          addCommentSuccess(postId, mapComments(response.data.comments))
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

export const setComment = (postId, comment) => ({
  type: SET_COMMENT,
  payload: { pid: postId, comment },
});

import {
  FETCH_OC_POSTS_FAILED,
  FETCH_OC_POSTS_STARTED,
  FETCH_OC_POSTS_SUCCEEDED,
  FETCH_OC_USERS_FAILED,
  FETCH_OC_USERS_STARTED,
  FETCH_OC_USERS_SUCCEEDED,
  DELETE_OC_POST_STARTED,
  DELETE_OC_POST_FAILED,
  DELETE_OC_POST_SUCCEEDED,
  DELETE_OC_COMMENT_STARTED,
  DELETE_OC_COMMENT_FAILED,
  DELETE_OC_COMMENT_SUCCEEDED,
} from "../constants";
import {
  getOCPosts,
  getUserByID,
  deleteOCPost,
  deleteOCComment,
} from "../api/opencourt-timeline";
import { acsToAggregate, acsToLevel } from "../utils/acsUtils";
import { showError } from "./error";
import { mapPost } from "../operators/mapPosts";

export const fetchOCPostsStarted = () => ({
  type: FETCH_OC_POSTS_STARTED,
});

export const fetchOCPostsFailed = () => ({
  type: FETCH_OC_POSTS_FAILED,
});

export const fetchOCPostsSucceeded = (data) => ({
  type: FETCH_OC_POSTS_SUCCEEDED,
  data,
});

export const fetchOCUsersStarted = () => ({
  type: FETCH_OC_USERS_STARTED,
});

export const fetchOCUsersFailed = () => ({
  type: FETCH_OC_USERS_FAILED,
});

export const fetchOCUsersSucceeded = (data) => ({
  type: FETCH_OC_USERS_SUCCEEDED,
  data,
});

export const deleteOCPostStarted = () => ({
  type: DELETE_OC_POST_STARTED,
});

export const deleteOCPostSucceeded = (id) => ({
  type: DELETE_OC_POST_SUCCEEDED,
  id,
});

export const deleteOCPostFailed = () => ({
  type: DELETE_OC_POST_FAILED,
});

export const deleteOCCommentStarted = () => ({
  type: DELETE_OC_COMMENT_STARTED,
});

export const deleteOCCommentSucceeded = (pid, cid) => ({
  type: DELETE_OC_COMMENT_SUCCEEDED,
  pid,
  cid,
});

export const deleteOCCommentFailed = () => ({
  type: DELETE_OC_COMMENT_FAILED,
});

export function deleteComment(pid, cid) {
  return function (dispatch) {
    dispatch(deleteOCCommentStarted());
    return deleteOCComment(pid, cid)
      .then(function (response) {
        dispatch(deleteOCCommentSucceeded(pid, cid));
      })
      .catch(function (error) {
        dispatch(deleteOCCommentFailed());
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

export function deletePost(postId) {
  return function (dispatch) {
    dispatch(deleteOCPostStarted());
    return deleteOCPost(postId)
      .then(function (response) {
        dispatch(deleteOCPostSucceeded(postId));
      })
      .catch(function (error) {
        dispatch(deleteOCPostFailed());
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

export function fetchAllUsers(posts, curUserId) {
  return function (dispatch) {
    dispatch(fetchOCUsersStarted());
    const users = new Set();
    posts.forEach((post) => {
      users.add(post.origPoster);
      post.comments.forEach((comment) => {
        users.add(comment.origPoster);
      });
    });
    users.add(curUserId);
    return getUserByID(Array.from(users))
      .then(function (response) {
        const users = {};
        response.data.forEach((user) => {
          users[user._id] = {
            username: user.displayName,
            acs: acsToAggregate(user.acs),
            acsLevel: acsToLevel(acsToAggregate(user.acs)),
            picture: user.picture,
          };
        });
        dispatch(fetchOCUsersSucceeded(users));
      })
      .catch(function (error) {
        dispatch(fetchOCPostsFailed());
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

export function fetchOCPosts(curUserId) {
  return function (dispatch) {
    dispatch(fetchOCPostsStarted());
    return getOCPosts()
      .then(function (response) {
        const posts = response.data.map(mapPost);
        dispatch(fetchOCPostsSucceeded(posts));
        dispatch(fetchAllUsers(posts, curUserId));
      })
      .catch(function (error) {
        dispatch(fetchOCPostsFailed());
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

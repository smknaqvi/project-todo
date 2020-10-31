import {
  FETCH_OC_POSTS_SUCCEEDED,
  FETCH_OC_POSTS_STARTED,
  FETCH_OC_USERS_STARTED,
  FETCH_OC_USERS_SUCCEEDED,
  DELETE_OC_POST_SUCCEEDED,
  DELETE_OC_COMMENT_SUCCEEDED,
} from "../constants";

import { Map } from "immutable";

const initState = Map({
  users: {},
  posts: [],
  fetchCompleted: false,
});

export const openCourtTimeline = (state = initState, action) => {
  switch (action.type) {
    case FETCH_OC_USERS_STARTED:
    case FETCH_OC_POSTS_STARTED:
      return state.set("fetchCompleted", false);
    case FETCH_OC_POSTS_SUCCEEDED:
      return state.set("posts", action.data);
    case FETCH_OC_USERS_SUCCEEDED:
      const newState = state
        .set("users", action.data)
        .set("fetchCompleted", true);
      return newState;
    case DELETE_OC_POST_SUCCEEDED:
      return state.set(
        "posts",
        state.get("posts").filter((post) => post.postId !== action.id)
      );
    case DELETE_OC_COMMENT_SUCCEEDED:
      const posts = state.get("posts").map((post) => {
        if (post.postId !== action.pid) {
          return post;
        } else {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.commentId !== action.cid
            ),
          };
        }
      });
      return state.set("posts", posts);
    default:
      return state;
  }
};

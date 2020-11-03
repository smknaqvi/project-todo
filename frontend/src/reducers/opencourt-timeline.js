import {
  FETCH_OC_POSTS_SUCCEEDED,
  FETCH_OC_POSTS_STARTED,
  FETCH_OC_USERS_STARTED,
  FETCH_OC_USERS_SUCCEEDED,
  DELETE_OC_POST_SUCCEEDED,
  DELETE_OC_COMMENT_SUCCEEDED,
  ADD_POST_SUCCEEDED,
  UNINITIALIZED,
  STARTED,
  SUCCEEDED,
  ADD_COMMENT_SUCCEEDED,
} from "../constants";

import { Map } from "immutable";

const initState = Map({
  users: {},
  posts: [],
  apiStatus: UNINITIALIZED,
});

export const openCourtTimeline = (state = initState, action) => {
  switch (action.type) {
    case FETCH_OC_USERS_STARTED:
    case FETCH_OC_POSTS_STARTED:
      return state.set("apiStatus", STARTED);
    case FETCH_OC_POSTS_SUCCEEDED:
      return state.set("posts", [...action.data]);
    case FETCH_OC_USERS_SUCCEEDED:
      const newState = state
        .set("users", action.data)
        .set("apiStatus", SUCCEEDED);
      return newState;
    case ADD_POST_SUCCEEDED:
      return state.set("posts", [{ ...action.post }, ...state.get("posts")]);
    case DELETE_OC_POST_SUCCEEDED:
      return state.set(
        "posts",
        state.get("posts").filter((post) => post.postId !== action.id)
      );
    case ADD_COMMENT_SUCCEEDED:
      const postsWithNewComment = state.get("posts").reduce((acc, post) => {
        if (post.postId !== action.payload.pid) {
          return [...acc, post];
        }
        return [...acc, { ...post, comments: [...action.payload.comments] }];
      }, []);
      return state.set("posts", postsWithNewComment);
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

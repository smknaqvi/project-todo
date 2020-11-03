import {
  ADD_COMMENT_STARTED,
  ADD_COMMENT_SUCCEEDED,
  SET_COMMENT,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  comments: Map(),
});

export const createComment = (state = initState, action) => {
  switch (action.type) {
    case ADD_COMMENT_STARTED:
      return state.setIn(["comments", action.pid, "isUploading"], true);
    case ADD_COMMENT_SUCCEEDED:
      return state
        .setIn(["comments", action.payload.pid, "isUploading"], false)
        .setIn(["comments", action.payload.pid, "comment"], "");
    case SET_COMMENT:
      return state.setIn(
        ["comments", action.payload.pid, "comment"],
        action.payload.comment
      );
    default:
      return state;
  }
};

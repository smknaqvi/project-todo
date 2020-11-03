import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { auth } from "./auth";
import { acs } from "./acs";
import { authPage } from "./auth-page";
import { error } from "./error";
import { success } from "./success";
import { player } from "./team";
import { openCourtTimeline } from "./opencourt-timeline";
import { createPost } from "./create-post";
import { LOGOUT } from "../constants";
import { createComment } from "./create-comment";

const appReducer = combineReducers({
  auth,
  authPage,
  error,
  acs,
  player,
  success,
  openCourtTimeline,
  createPost,
  createComment,
  form: formReducer,
});

export default (state, action) => {
  switch (action.type) {
    case LOGOUT:
      return appReducer(undefined, action);
    default:
      return appReducer(state, action);
  }
};

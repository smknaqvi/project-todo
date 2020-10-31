import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { auth } from "./auth";
import { acs } from "./acs";
import { authPage } from "./auth-page";
import { error } from "./error";
import { openCourtTimeline } from "./opencourt-timeline";
import { createPost } from "./create-post";

export default combineReducers({
  auth,
  authPage,
  error,
  acs,
  openCourtTimeline,
  createPost,
  form: formReducer,
});

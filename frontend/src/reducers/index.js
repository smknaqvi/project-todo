import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { auth } from "./auth";
import { acs } from "./acs";
import { authPage } from "./auth-page";
import { error } from "./error";
import { openCourtTimeline } from "./opencourt-timeline";

export default combineReducers({
  auth,
  authPage,
  error,
  acs,
  openCourtTimeline,
  form: formReducer,
});

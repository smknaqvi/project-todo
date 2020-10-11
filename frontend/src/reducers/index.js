import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { signupPage } from "./signup-page";
import { auth } from "./auth";
import { authPage } from "./auth-page";

export default combineReducers({
  auth,
  signupPage,
  authPage,
  form: formReducer,
});

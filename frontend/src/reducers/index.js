import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { auth } from "./auth";
import { acs } from "./acs";
import { authPage } from "./auth-page";
import { error } from "./error";
import { profile } from "./profile";
import { userProfile } from "./user-profile";
import { success } from "./success";
import { player } from "./player";
import { openCourtTimeline } from "./opencourt-timeline";
import { createPost } from "./create-post";
import { uploadProfilePhoto } from "./upload-profile-photo";
import { dailyPicks } from "./daily-picks";
import { LOGOUT } from "../constants";
import { createComment } from "./create-comment";
import { trivia } from "./trivia";
import { debatePage } from "./debate-page";
import { debateWritePage } from "./debate-write-page";
import { playoffs } from "./playoffs";
import { hhTriviaPage } from "./hhtrivia-page";
import { confirmationDialog } from "./confirmation-dialog";
const appReducer = combineReducers({
  auth,
  authPage,
  error,
  acs,
  profile,
  player,
  dailyPicks,
  success,
  openCourtTimeline,
  createPost,
  uploadProfilePhoto,
  createComment,
  trivia,
  debatePage,
  debateWritePage,
  playoffs,
  hhTriviaPage,
  userProfile,
  confirmationDialog,
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

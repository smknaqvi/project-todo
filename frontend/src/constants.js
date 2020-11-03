// ACTIONS
export const LOGIN_STARTED = "LOGIN_STARTED";
export const LOGIN_SUCCEEDED = "LOGIN_SUCCEEDED";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const UPDATE_ACS_STARTED = "UPDATE_ACS_STARTED";
export const UPDATE_ACS_FAILED = "UPDATE_ACS_FAILED";
export const UPDATE_ACS_SUCCEEDED = "UPDATE_ACS_SUCCEEDED";

export const SIGNUP_STARTED = "SIGNUP_STARTED";
export const SIGNUP_SUCCEEDED = "SIGNUP_SUCCEEDED";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

export const FETCH_ACS_STARTED = "FETCH_ACS_STARTED";
export const FETCH_ACS_SUCCEEDED = "FETCH_ACS_SUCCEEDED";
export const FETCH_ACS_FAILED = "FETCH_ACS_FAILED";

export const FETCH_PROFILE_STARTED = "FETCH_PROFILE_STARTED ";
export const FETCH_PROFILE_SUCCEEDED = "FETCH_PROFILE_SUCCEEDED";

export const UPDATE_PROFILE_STARTED = "UPDATE_PROFILE_STARTED";
export const UPDATE_PROFILE_SUCCEEDED = "UPDATE_PROFILE_SUCCEEDED ";

export const FETCH_OC_POSTS_STARTED = "FETCH_OC_POSTS_STARTED";
export const FETCH_OC_POSTS_SUCCEEDED = "FETCH_OC_POSTS_SUCCEEDED";
export const FETCH_OC_POSTS_FAILED = "FETCH_OC_POSTS_FAILED";

export const FETCH_OC_USERS_STARTED = "FETCH_OC_USERS_STARTED";
export const FETCH_OC_USERS_SUCCEEDED = "FETCH_OC_USERS_SUCCEEDED";
export const FETCH_OC_USERS_FAILED = "FETCH_OC_USERS_FAILED";

export const DELETE_OC_POST_STARTED = "DELETE_OC_POST_STARTED";
export const DELETE_OC_POST_SUCCEEDED = "DELETE_OC_POST_SUCCEEDED";
export const DELETE_OC_POST_FAILED = "DELETE_OC_POST_FAILED";

export const DELETE_OC_COMMENT_STARTED = "DELETE_OC_COMMENT_STARTED";
export const DELETE_OC_COMMENT_FAILED = "DELETE_OC_COMMENT_FAILED";
export const DELETE_OC_COMMENT_SUCCEEDED = "DELETE_OC_COMMENT_SUCCEEDED";

export const ADD_POST_STARTED = "ADD_POST_STARTED";
export const ADD_POST_SUCCEEDED = "ADD_POST_SUCCEEDED";
export const ADD_POST_FAILED = "ADD_POST_FAILED";

export const UPLOAD_PHOTO_STARTED = "UPLOAD_PHOTO_STARTED";
export const UPLOAD_PHOTO_SUCCEEDED = "UPLOAD_PHOTO_SUCCEEDED";

export const SET_BASE64_IMAGE_STARTED = "SET_BASE64_IMAGE_STARTED";
export const SET_BASE64_IMAGE_SUCCEEDED = "SET_BASE64_IMAGE_SUCCEEDED";
export const SET_BASE64_IMAGE_FAILED = "SET_BASE64_IMAGE_FAILED";

export const SET_PROFILE_PHOTO_STARTED = "SET_PROFILE_PHOTO_STARTED";
export const SET_PROFILE_PHOTO_SUCCEEDED = "SET_PROFILE_PHOTO_SUCCEEDED";
export const SET_PROFILE_PHOTO_FAILED = "SET_PROFILE_PHOTO_FAILED";

export const CLEAR_BASE64_IMAGE = "CLEAR_BASE64_IMAGE";

export const SET_CONTENT = "SET_CONTENT";

export const ADD_COMMENT_STARTED = "ADD_COMMENT_STARTED";
export const ADD_COMMENT_SUCCEEDED = "ADD_COMMENT_SUCCEEDED";
export const ADD_COMMENT_FAILED = "ADD_COMMENT_FAILED";

export const SET_COMMENT = "SET_COMMENT";

export const CLOSE_ERROR = "CLOSE_ERROR";
export const SHOW_ERROR = "SHOW_ERROR";

export const CLOSE_SUCCESS = "CLOSE_SUCCESS";
export const SHOW_SUCCESS = "SHOW_SUCCESS";

export const LOGOUT = "LOGOUT";

export const TOGGLE_AUTH_PAGE = "TOGGLE_AUTH_PAGE";

export const INIT_PHOTO_STARTED = "INIT_PHOTO_STARTED";
export const INIT_PHOTO_SUCCEEDED = "INIT_PHOTO_SUCCEEDED";

export const FETCH_PLAYERS_STARTED = "FETCH_PLAYERS_STARTED";
export const FETCH_PLAYERS_FAILED = "FETCH_PLAYERS_FAILED";
export const FETCH_PLAYERS_SUCCEEDED = "FETCH_PLAYERS_SUCCEEDED";

export const UPDATE_PICKS = "UPDATE_PICKS";

export const SEND_PREDICTS_SUCCEEDED = "SEND_PREDICTS_SUCCEEDED";
export const SEND_PREDICTS_STARTED = "SEND_PREDICTS_STARTED";
export const SENDPREDICTS_FAILED = "SENDPREDICTS_FAILED";

export const GET_PREDICTS_SUCCEEDED = "GET_PREDICTS_SUCCEEDED";
export const GET_PREDICTS_STARTED = "GET_PREDICTS_STARTED";
export const GET_PREDICTS_FAILED = "GET_PREDICTS_FAILED";

export const GET_WINNERS_STARTED = "GET_WINNERS_STARTED";
export const GET_WINNERS_SUCCEEDED = "GET_WINNERS_SUCCEEDED";
export const GET_WINNERS_FAILED = "GET_WINNERS_FAILED";

// API STATUS
export const UNINITIALIZED = "UNINITIALIZED";
export const STARTED = "STARTED";
export const SUCCEEDED = "SUCCEEDED";
export const FAILED = "FAILED";

//  MISC

// LocalStorage
export const USER_KEY = "user";

// NAVBAR
export const NAV_ELEMENTS = [
  { name: "The Zone", link: "/thezone" },
  { name: "Debate", link: "/debate" },
  { name: "Trivia", link: "/trivia" },
];

export const MY_PROFILE_NAV_ELEMENT = [
  { name: "My Profile", link: "/profile" },
];

// Endpoints
export const API_ENDPOINT = "http://localhost:5000";

// ACS
export const EXPERT_ANALYST = "Expert Analyst";
export const PRO_ANALYST = "Pro Analyst";
export const ANALYST = "Analyst";
export const FANALYST = "Fanalyst";

export const EXPERT_ANALYST_RANGE = { maxScore: 1100, name: EXPERT_ANALYST };
export const PRO_ANALYST_RANGE = { maxScore: 900, name: PRO_ANALYST };
export const ANALYST_RANGE = { maxScore: 600, name: ANALYST };
export const FANALYST_RANGE = { maxScore: 300, name: FANALYST };

// All awards
export const AWARDS = [
  { award: "Most Valuable Player", key: "mvp" },
  { award: "Rookie of The Year", key: "rookieOTY" },
  { award: "Most Improved Player", key: "MIP" },
  { award: "Sixth-man Of the Year", key: "sixMan" },
  { award: "Defensive Player of the Year", key: "defensivePOTY" },
];

// Keys
export const ENTER = "Enter";

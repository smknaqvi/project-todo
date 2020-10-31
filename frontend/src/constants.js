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

export const CLOSE_ERROR = "CLOSE_ERROR";
export const SHOW_ERROR = "SHOW_ERROR";

export const LOGOUT = "LOGOUT";

export const TOGGLE_AUTH_PAGE = "TOGGLE_AUTH_PAGE";

// API STATUS
export const UNINITIALIZED = "UNINITIALIZED";
export const STARTED = "STARTED";
export const SUCCEEDED = "SUCCEEDED";
export const FAILED = "FAILED";

// NAVBAR
export const NAV_ELEMENTS = [
  { name: "The Zone", link: "/thezone" },
  { name: "Debate", link: "/debate" },
  { name: "Trivia", link: "/trivia" },
  { name: "Picks and Predictions", link: "/picksnpredictions" },
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

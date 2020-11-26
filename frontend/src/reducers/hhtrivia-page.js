import {
  SHOW_ERROR,
  CLOSE_ERROR,
  SHOW_SUCCESS,
  CLOSE_SUCCESS,
  FETCH_USERS_HHTRIVIA_GAMES_SUCCEEDED,
  FETCH_HHTRIVIA_OPPONENTS_SUCCEEDED,
  DELETE_HHTRIVIA_GAME_SUCCEEDED,
  CREATE_HHTRIVIA_GAME_SUCCEEDED,
  CREATE_HHTRIVIA_GAME_STARTED,
  JOIN_HHTRIVIA_GAME_STARTED,
  JOIN_HHTRIVIA_GAME_SUCCEEDED,
  JOIN_HHTRIVIA_GAME_FAILED,
  START_HHTRIVIA_GAME_SUCCEEDED,
  SET_HHTRIVIA_SELECTED_ANSWER,
  INCREMENT_HHTRIVIA_CUR_QUESTION,
  SET_HHTRIVIA_DEFAULT_PAGE,
  SET_HHTRIVIA_ACS_CHANGE,
  SET_HHTRIVIA_GAME_EVALUATED_SUCCEEDED,
  UPDATE_OTHER_ACS_SUCCEEDED,
  INCREMENT_HHTRIVIA_CORRECT_QUESTION,
} from "../constants";

import { Map } from "immutable";

const initState = Map({
  showError: false,
  showSucess: false,
  errorReason: "",
  successReason: "",
  allGames: [],
  users: {},
  showGame: false,
  curGame: {},
  curQuestion: 0,
  selectedAnswer: "",
  fetchAllGamesFinished: false,
  fetchAllUsersFinished: false,
});

export const hhTriviaPage = (state = initState, action) => {
  let temp = "";
  switch (action.type) {
    case SHOW_ERROR:
      return state.set("showError", true).set("errorReason", action.reason);
    case CLOSE_ERROR:
      return state.set("showError", false).set("errorReason", "");
    case SHOW_SUCCESS:
      return state.set("showSuccess", true).set("successReason", action.reason);
    case CLOSE_SUCCESS:
      return state.set("showSuccess", false).set("successReason", "");
    case FETCH_USERS_HHTRIVIA_GAMES_SUCCEEDED:
      return state
        .set("allGames", action.games)
        .set("fetchAllGamesFinished", true);
    case FETCH_HHTRIVIA_OPPONENTS_SUCCEEDED:
      temp = action.users.reduce((acc, cur) => {
        acc[cur._id] = { ...cur };
        return acc;
      }, {});
      return state.set("users", temp).set("fetchAllUsersFinished", true);
    case DELETE_HHTRIVIA_GAME_SUCCEEDED:
      return state.set(
        "allGames",
        state.get("allGames").filter((game) => game._id !== action.gameId)
      );
    case CREATE_HHTRIVIA_GAME_STARTED:
      return state.set("fetchAllGamesFinished", false);
    case CREATE_HHTRIVIA_GAME_SUCCEEDED:
      return state
        .set("allGames", [...state.get("allGames"), action.game])
        .set("fetchAllGamesFinished", true);
    case JOIN_HHTRIVIA_GAME_STARTED:
      return state.set("fetchAllGamesFinished", false);
    case JOIN_HHTRIVIA_GAME_FAILED:
      return state.set("fetchAllGamesFinished", true);
    case JOIN_HHTRIVIA_GAME_SUCCEEDED:
      return state
        .set("allGames", [...state.get("allGames"), action.game])
        .set("fetchAllGamesFinished", true);
    case START_HHTRIVIA_GAME_SUCCEEDED:
      temp = state.get("allGames").reduce((acc, cur) => {
        if (cur._id === action.game._id) {
          return [...acc, action.game];
        } else {
          return [...acc, cur];
        }
      }, []);
      return state
        .set("curGame", action.game)
        .set("showGame", true)
        .set("curQuestion", 0)
        .set("allGames", temp);
    case SET_HHTRIVIA_SELECTED_ANSWER:
      return state.set("selectedAnswer", action.answer);
    case INCREMENT_HHTRIVIA_CUR_QUESTION:
      return state.set("curQuestion", state.get("curQuestion") + 1);
    case SET_HHTRIVIA_DEFAULT_PAGE:
      if (state.get("showGame")) {
        const curGameID = state.get("curGame")._id;
        temp = state.get("allGames").reduce((acc, cur) => {
          if (cur._id === curGameID) {
            return [...acc, state.get("curGame")];
          } else {
            return [...acc, cur];
          }
        }, []);
        return state.set("allGames", temp).set("showGame", false);
      }
      return state.set("showGame", false);
    case SET_HHTRIVIA_ACS_CHANGE:
      temp = state.get("allGames").reduce((acc, cur) => {
        if (cur._id === action.gameId) {
          cur.player1.acsChange = action.player1ACSChange;
          cur.player2.acsChange = action.player2ACSChange;
        }
        return [...acc, cur];
      }, []);
      return state.set("allGames", temp);
    case SET_HHTRIVIA_GAME_EVALUATED_SUCCEEDED:
      temp = state.get("allGames").reduce((acc, cur) => {
        if (cur._id === action.gameId) {
          cur.evaluated = true;
        }
        return [...acc, cur];
      }, []);
      return state.set("allGames", temp);
    case UPDATE_OTHER_ACS_SUCCEEDED:
      temp = { ...state.get("users") };
      temp[action.userId].acs = action.acs;
      return state.set("users", temp);
    case INCREMENT_HHTRIVIA_CORRECT_QUESTION:
      temp = { ...state.get("curGame") };
      if (temp.player1.userId === action.userId) {
        temp.player1.numCorrect += 1;
      } else {
        temp.player2.numCorrect += 1;
      }
      return state.set("curGame", temp);
    default:
      return state;
  }
};

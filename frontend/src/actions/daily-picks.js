import {
  FETCH_GAME_STARTED,
  FETCH_GAME_SUCCEEDED,
  UPDATE_DATE,
  UPDATE_DAILY_PICKS_STARTED,
  UPDATE_DAILY_PICKS_SUCCEEDED,
  UPDATE_DAILY_PICKS_FAILED,
  FETCH_DAILY_PICKS_STARTED,
  FETCH_DAILY_PICKS_SUCCEEDED,
  FETCH_DAILY_PICKS_FAILED,
  UPDATE_DAILY_PICKS,
} from "../constants";
import { gamesRequest } from "../api/games";
import {
  putDailyPicks,
  postDailyPicks,
  getDailyPicks,
} from "../api/daily-picks";
import { showError } from "./error";
import { showSuccess } from "./success";

export const gamesRequestStarted = () => ({
  type: FETCH_GAME_STARTED,
});

export const gamesRequestSuccess = (games) => ({
  type: FETCH_GAME_SUCCEEDED,
  games,
});

export const updateDailyPicks = (picks) => ({
  type: UPDATE_DAILY_PICKS,
  picks: picks,
});

export function getGames() {
  return function (dispatch) {
    dispatch(gamesRequestStarted());
    return gamesRequest()
      .then(function (response) {
        dispatch(gamesRequestSuccess(response.data));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(showError(error.response.data));
        } else if (error.request) {
          dispatch(showError("Unable to reach server"));
        } else {
          dispatch(showError("Internal server error"));
        }
      });
  };
}

export const dailyPicksRequestStarted = () => ({
  type: FETCH_DAILY_PICKS_STARTED,
});

export const dailyPicksRequestSuccess = (dailyPicks) => ({
  type: FETCH_DAILY_PICKS_SUCCEEDED,
  dailyPicks,
});

export const dailyPicksRequestFailed = () => ({
  type: FETCH_DAILY_PICKS_FAILED,
});

export function getDailyPicksFromDB(userid) {
  return function (dispatch) {
    dispatch(dailyPicksRequestStarted());
    return getDailyPicks(userid)
      .then(function (response) {
        if (response.data !== null) {
          dispatch(dailyPicksRequestSuccess(response.data.picks));
        } else {
          dispatch(dailyPicksRequestFailed());
        }
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(showError(error.response.data));
        } else if (error.request) {
          dispatch(showError("Unable to reach server"));
        } else {
          dispatch(showError("Internal server error"));
        }
      });
  };
}

export const updateDate = (date) => ({
  type: UPDATE_DATE,
  date,
});
export function sendDailyPicksToDb(userid, pick, madePicks) {
  return function (dispatch) {
    dispatch(sendPicksStarted());
    const upsertPick = madePicks ? putDailyPicks : postDailyPicks;
    return upsertPick(userid, pick)
      .then(function (response) {
        dispatch(sendPicksSuccess(response.data.picks));
        dispatch(showSuccess("Saved Predictions!"));
      })
      .catch(function (error) {
        if (error.response) {
          dispatch(showError(error.response.data));
        } else if (error.request) {
          dispatch(showError("Unable to reach server"));
        } else {
          dispatch(showError("Internal server error"));
        }
      });
  };
}

export const sendPicksStarted = () => ({
  type: UPDATE_DAILY_PICKS_STARTED,
});
export const sendPicksSuccess = (picks) => ({
  type: UPDATE_DAILY_PICKS_SUCCEEDED,
  picks,
});
export const sendPicksFailed = () => ({
  type: UPDATE_DAILY_PICKS_FAILED,
});

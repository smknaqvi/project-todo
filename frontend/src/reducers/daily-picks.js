import {
  FETCH_GAME_SUCCEEDED,
  UPDATE_DAILY_PICKS_SUCCEEDED,
  UPDATE_DATE,
  FETCH_DAILY_PICKS_SUCCEEDED,
  UPDATE_DAILY_PICKS,
  FETCH_DAILY_PICKS_FAILED,
  UPDATE_DAILY_PICKS_STARTED,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  date: new Date(),
  dailyPicks: new Map(),
  games: [],
  madePicks: false,
});

export const dailyPicks = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_DAILY_PICKS_STARTED:
      return state;
    case FETCH_GAME_SUCCEEDED:
      return state.set("games", action.games);
    case UPDATE_DAILY_PICKS_SUCCEEDED:
      return state.set("dailyPicks", Map(action.picks)).set("madePicks", true);
    case FETCH_DAILY_PICKS_SUCCEEDED:
      return state.set("madePicks", true).mergeDeep({
        dailyPicks: { ...action.dailyPicks },
      });
    case FETCH_DAILY_PICKS_FAILED:
      return state.set("madePicks", false);
    case UPDATE_DATE:
      return state.set("date", new Date(action.date));
    case UPDATE_DAILY_PICKS:
      const newState = state.mergeDeep({
        dailyPicks: { ...action.picks },
      });
      return newState;
    default:
      return state;
  }
};

import {
  GET_WINNERS_SUCCEEDED,
  FETCH_PLAYERS_SUCCEEDED,
  UPDATE_PICKS,
  SEND_PREDICTS_SUCCEEDED,
  GET_PREDICTS_SUCCEEDED,
  GET_PREDICTS_FAILED,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  players: [],
  awards: Map(),
  madePicks: false,
  fetchPlayers: false,
  fetchPredictions: false,
  fetchWinners: false,
  winners: Map(),
  isEvaluated: false,
});

export const player = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PLAYERS_SUCCEEDED:
      return state.set("players", action.players).set("fetchPlayers", true);
    case UPDATE_PICKS:
      return state.mergeDeep({ awards: { ...action.picks } });
    case SEND_PREDICTS_SUCCEEDED:
      return state
        .set("madePicks", true)
        .set("isEvaluated", action.isEvaluated)
        .mergeDeep({
          awards: { ...action.picks },
          results: { ...action.results },
        });
    case GET_PREDICTS_SUCCEEDED:
      return state
        .set("madePicks", true)
        .set("isEvaluated", action.isEvaluated)
        .mergeDeep({
          awards: { ...action.picks },
          results: { ...action.results },
        })
        .set("fetchPredictions", true);
    case GET_PREDICTS_FAILED:
      return state.set("madePicks", false).set("fetchPredictions", true);
    case GET_WINNERS_SUCCEEDED:
      return state
        .mergeDeep({ winners: { ...action.winners } })
        .set("fetchWinners", true);
    default:
      return state;
  }
};

import {
  FETCH_PLAYERS_STARTED,
  FETCH_PLAYERS_SUCCEEDED,
  UPDATE_PICKS,
} from "../constants";
import { playerRequest } from "../api/team";
import { showError } from "./error";

export const playerRequestStarted = () => ({
  type: FETCH_PLAYERS_STARTED,
});

export const playerRequestSuccess = (players) => ({
  type: FETCH_PLAYERS_SUCCEEDED,
  players,
});

export const updatePicks = (picks) => ({
  type: UPDATE_PICKS,
  picks: picks,
});

export function getPlayers() {
  return function (dispatch) {
    dispatch(playerRequestStarted());
    return playerRequest()
      .then(function (response) {
        let ListOfPlayers = [];
        response.data.forEach((element) => {
          ListOfPlayers = ListOfPlayers.concat(element.players);
        });
        dispatch(playerRequestSuccess(ListOfPlayers));
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

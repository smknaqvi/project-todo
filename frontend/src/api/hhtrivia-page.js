import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function createHHTriviaGameRequest(userId) {
  return axios.post(API_ENDPOINT + "/hhtrivia/create-game", {
    userId: userId,
  });
}

export function joinHHTriviaGameRequest(userId) {
  return axios.put(API_ENDPOINT + "/hhtrivia/join-game", {
    userId: userId,
  });
}

export function getHHTriviaGameRequest(gameId) {
  return axios.get(API_ENDPOINT + "/hhtrivia/" + gameId, {});
}

export function getUsersHHTriviaGamesRequest(userId) {
  return axios.get(API_ENDPOINT + "/hhtrivia/user-games/" + userId, {});
}

export function setHHTriviaGameStartRequest(gameId, playerNum) {
  return axios.put(
    API_ENDPOINT + "/hhtrivia/" + gameId + "/start/" + playerNum,
    {}
  );
}

export function deleteHHTriviaGameRequest(gameId) {
  return axios.delete(API_ENDPOINT + "/hhtrivia/" + gameId);
}

export function incrementHHTriviaGameCorrectRequest(gameId, playerNum) {
  return axios.put(
    API_ENDPOINT + "/hhtrivia/" + gameId + "/increment-correct/" + playerNum,
    {}
  );
}

export function setHHTriviaGameACSChangeRequest(gameId, playerNum, acsChange) {
  return axios.put(
    API_ENDPOINT + "/hhtrivia/" + gameId + "/acsChange/" + playerNum,
    { acsChange: acsChange }
  );
}

export function setHHTriviaGameEvaluatedRequest(gameId) {
  return axios.put(API_ENDPOINT + "/hhtrivia/" + gameId + "/evaluate", {});
}

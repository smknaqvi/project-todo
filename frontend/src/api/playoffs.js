import axios from "axios";
import { API_ENDPOINT } from "../constants";

export function userBracketChoicesRequest(userId) {
  return axios.get(`${API_ENDPOINT}/bracket/bracketChoice/userId/${userId}`);
}

export function bracketsRequest(year) {
  return axios.get(`${API_ENDPOINT}/bracket/${year}`);
}

export function postBracket({
  teamOne,
  teamTwo,
  winnerChoice,
  userId,
  isFirstMatch,
  teamOneScore,
  teamTwoScore,
  isEvaluated,
  isWinnerCorrect,
  matchNumber,
}) {
  return axios.post(`${API_ENDPOINT}/bracket/bracketChoice/`, {
    teamOne,
    teamTwo,
    winnerChoice,
    userId,
    isFirstMatch,
    teamOneScore,
    teamTwoScore,
    isEvaluated,
    isWinnerCorrect,
    matchNumber,
  });
}

export function putBracket({
  _id,
  teamOne,
  teamTwo,
  winnerChoice,
  userId,
  isFirstMatch,
  teamOneScore,
  teamTwoScore,
  isEvaluated,
  isWinnerCorrect,
  matchNumber,
}) {
  return axios.put(`${API_ENDPOINT}/bracket/bracketChoice/${_id}`, {
    teamOne,
    teamTwo,
    winnerChoice,
    userId,
    isFirstMatch,
    teamOneScore,
    teamTwoScore,
    isEvaluated,
    isWinnerCorrect,
    matchNumber,
  });
}

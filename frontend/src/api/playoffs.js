import { client } from "./client";



export function userBracketChoicesRequest(userId) {
  return client.get(`/bracket/bracketChoice/userId/${userId}`);
}

export function bracketsRequest(year) {
  return client.get(`/bracket/${year}`);
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
  return client.post(`/bracket/bracketChoice/`, {
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
  return client.put(`/bracket/bracketChoice/${_id}`, {
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

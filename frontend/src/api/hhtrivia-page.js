import { client } from "./client";



export function createHHTriviaGameRequest(userId) {
  return client.post( "/hhtrivia/create-game", {
    userId: userId,
  });
}

export function joinHHTriviaGameRequest(userId) {
  return client.put( "/hhtrivia/join-game", {
    userId: userId,
  });
}

export function getHHTriviaGameRequest(gameId) {
  return client.get( "/hhtrivia/" + gameId, {});
}

export function getUsersHHTriviaGamesRequest(userId) {
  return client.get( "/hhtrivia/user-games/" + userId, {});
}

export function setHHTriviaGameStartRequest(gameId, playerNum) {
  return client.put(
     "/hhtrivia/" + gameId + "/start/" + playerNum,
    {}
  );
}

export function deleteHHTriviaGameRequest(gameId) {
  return client.delete( "/hhtrivia/" + gameId);
}

export function incrementHHTriviaGameCorrectRequest(gameId, playerNum) {
  return client.put(
     "/hhtrivia/" + gameId + "/increment-correct/" + playerNum,
    {}
  );
}

export function setHHTriviaGameACSChangeRequest(gameId, playerNum, acsChange) {
  return client.put(
     "/hhtrivia/" + gameId + "/acsChange/" + playerNum,
    { acsChange: acsChange }
  );
}

export function setHHTriviaGameEvaluatedRequest(gameId) {
  return client.put( "/hhtrivia/" + gameId + "/evaluate", {});
}

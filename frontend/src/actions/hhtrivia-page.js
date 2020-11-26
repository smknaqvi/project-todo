import {
  FETCH_USERS_HHTRIVIA_GAMES_STARTED,
  FETCH_USERS_HHTRIVIA_GAMES_SUCCEEDED,
  FETCH_HHTRIVIA_OPPONENTS_STARTED,
  FETCH_HHTRIVIA_OPPONENTS_SUCCEEDED,
  DELETE_HHTRIVIA_GAME_STARTED,
  DELETE_HHTRIVIA_GAME_SUCCEEDED,
  CREATE_HHTRIVIA_GAME_STARTED,
  CREATE_HHTRIVIA_GAME_SUCCEEDED,
  JOIN_HHTRIVIA_GAME_STARTED,
  JOIN_HHTRIVIA_GAME_SUCCEEDED,
  JOIN_HHTRIVIA_GAME_FAILED,
  START_HHTRIVIA_GAME_STARTED,
  START_HHTRIVIA_GAME_SUCCEEDED,
  SET_HHTRIVIA_SELECTED_ANSWER,
  INCREMENT_HHTRIVIA_CUR_QUESTION,
  SET_HHTRIVIA_DEFAULT_PAGE,
  SET_HHTRIVIA_ACS_CHANGE,
  SET_HHTRIVIA_GAME_EVALUATED_SUCCEEDED,
  INCREMENT_HHTRIVIA_CORRECT_QUESTION,
} from "../constants";
import { showError } from "./error";
import { showSuccess } from "./success";
import { updateACS, updateOtherACS } from "./acs";
import { getUserByID } from "../api/opencourt-timeline";
import {
  createHHTriviaGameRequest,
  joinHHTriviaGameRequest,
  getHHTriviaGameRequest,
  getUsersHHTriviaGamesRequest,
  setHHTriviaGameACSChangeRequest,
  setHHTriviaGameStartRequest,
  deleteHHTriviaGameRequest,
  incrementHHTriviaGameCorrectRequest,
  setHHTriviaGameEvaluatedRequest,
} from "../api/hhtrivia-page";

export const getUsersHHTriviaGamesStarted = () => ({
  type: FETCH_USERS_HHTRIVIA_GAMES_STARTED,
});

export const getUsersHHTriviaGamesSucceeded = (games) => ({
  type: FETCH_USERS_HHTRIVIA_GAMES_SUCCEEDED,
  games,
});

export const getHHTriviaOpponentsStarted = () => ({
  type: FETCH_HHTRIVIA_OPPONENTS_STARTED,
});

export const getHHTriviaOpponentsSucceeded = (users) => ({
  type: FETCH_HHTRIVIA_OPPONENTS_SUCCEEDED,
  users,
});

export const deleteHHTriviaGameStarted = () => ({
  type: DELETE_HHTRIVIA_GAME_STARTED,
});

export const deleteHHTriviaGameSucceeded = (gameId) => ({
  type: DELETE_HHTRIVIA_GAME_SUCCEEDED,
  gameId,
});

export const createHHTriviaGameStarted = () => ({
  type: CREATE_HHTRIVIA_GAME_STARTED,
});

export const createHHTriviaGameSucceeded = (game) => ({
  type: CREATE_HHTRIVIA_GAME_SUCCEEDED,
  game,
});

export const joinHHTriviaGameStarted = () => ({
  type: JOIN_HHTRIVIA_GAME_STARTED,
});

export const joinHHTriviaGameSucceeded = (game) => ({
  type: JOIN_HHTRIVIA_GAME_SUCCEEDED,
  game,
});

export const joinHHTriviaGameFailed = () => ({
  type: JOIN_HHTRIVIA_GAME_FAILED,
});

export const startHHTriviaGameStarted = () => ({
  type: START_HHTRIVIA_GAME_STARTED,
});

export const startHHTriviaGameSucceded = (game) => ({
  type: START_HHTRIVIA_GAME_SUCCEEDED,
  game,
});

export const setHHTriviaSelectedAnswer = (answer) => ({
  type: SET_HHTRIVIA_SELECTED_ANSWER,
  answer,
});

export const incrementHHTriviaCurQuestion = () => ({
  type: INCREMENT_HHTRIVIA_CUR_QUESTION,
});

export const setHHTriviaDefaultPage = () => ({
  type: SET_HHTRIVIA_DEFAULT_PAGE,
});

export const incrementHHTriviaCorrectQuestion = (userId) => ({
  type: INCREMENT_HHTRIVIA_CORRECT_QUESTION,
  userId,
});

export const setHHTriviaACSChange = (
  gameId,
  player1ACSChange,
  player2ACSChange
) => ({
  type: SET_HHTRIVIA_ACS_CHANGE,
  gameId,
  player1ACSChange,
  player2ACSChange,
});

export const setHHTriviaGameEvaluatedSuccess = (gameId) => ({
  type: SET_HHTRIVIA_GAME_EVALUATED_SUCCEEDED,
  gameId,
});

export function getUsersHHTriviaGames(userId) {
  return function (dispatch) {
    dispatch(getUsersHHTriviaGamesStarted());
    return getUsersHHTriviaGamesRequest(userId)
      .then(function (games) {
        dispatch(getUsersHHTriviaGamesSucceeded(games.data));
        dispatch(getHHTriviaOpponents(games.data));
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

function extractUserSetFromGames(games) {
  const userSet = new Set();
  games.forEach((game) => {
    if (game.player1.userId) {
      const player1 = game.player1.userId.trim();
      if (player1.length) {
        userSet.add(player1);
      }
    }
    if (game.player2.userId) {
      const player2 = game.player2.userId.trim();
      if (player2.length) {
        userSet.add(player2);
      }
    }
  });
  return userSet;
}

export function getHHTriviaOpponents(games) {
  return function (dispatch) {
    dispatch(getHHTriviaOpponentsStarted());
    const userSet = extractUserSetFromGames(games);
    return getUserByID(Array.from(userSet))
      .then(function (users) {
        dispatch(getHHTriviaOpponentsSucceeded(users.data));
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

export function deleteHHTriviaGame(gameId) {
  return function (dispatch) {
    dispatch(deleteHHTriviaGameStarted());
    return deleteHHTriviaGameRequest(gameId)
      .then(function (game) {
        dispatch(deleteHHTriviaGameSucceeded(game.data._id));
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

export function createHHTriviaGame(userId) {
  return function (dispatch) {
    dispatch(createHHTriviaGameStarted());
    return createHHTriviaGameRequest(userId)
      .then(function (game) {
        dispatch(createHHTriviaGameSucceeded(game.data));
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

export function joinHHTriviaGame(userId) {
  return function (dispatch) {
    dispatch(joinHHTriviaGameStarted());
    return joinHHTriviaGameRequest(userId)
      .then(function (game) {
        dispatch(joinHHTriviaGameSucceeded(game.data));
      })
      .catch(function (error) {
        dispatch(joinHHTriviaGameFailed());
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

export function startHHTriviaGame(gameId, playerNum) {
  return function (dispatch) {
    dispatch(startHHTriviaGameStarted());
    return setHHTriviaGameStartRequest(gameId, playerNum)
      .then(function (_) {
        dispatch(getHHTriviaGameByID(gameId));
      })
      .catch(function (error) {
        dispatch(joinHHTriviaGameFailed());
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

export function getHHTriviaGameByID(gameId) {
  return function (dispatch) {
    return getHHTriviaGameRequest(gameId)
      .then(function (game) {
        dispatch(startHHTriviaGameSucceded(game.data));
      })
      .catch(function (error) {
        dispatch(joinHHTriviaGameFailed());
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

function incrementHHTriviaGameCorrect(gameId, playerNum, userId) {
  return function (dispatch) {
    return incrementHHTriviaGameCorrectRequest(gameId, playerNum)
      .then(function (res) {
        dispatch(incrementHHTriviaCorrectQuestion(userId));
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

function checkAnswer(question, selectedAnswer) {
  let correct = false;
  question.responses.forEach((answer) => {
    if (answer.text === selectedAnswer && answer.correct) {
      correct = true;
    }
  });
  return correct;
}

export function validateHHTriviaAnswer(
  curGame,
  curQuestion,
  selectedAnswer,
  userId
) {
  return function (dispatch) {
    const playerNum = curGame.player1.userId === userId ? 1 : 2;
    const question = curGame.questions[curQuestion];
    if (checkAnswer(question, selectedAnswer)) {
      dispatch(incrementHHTriviaGameCorrect(curGame._id, playerNum, userId));
      dispatch(showSuccess("Correct!"));
    } else {
      const correctAnswer = question.responses.filter((response) => {
        return response.correct === true;
      })[0].text;
      dispatch(
        showError("Incorrect: the correct answer was: " + correctAnswer)
      );
    }
  };
}

export function evaluateHHTriviaGame(games, users, gameNum, curUserId) {
  return function (dispatch) {
    const game = games[gameNum];
    const player1ACS = users[game.player1.userId].acs;
    const player2ACS = users[game.player2.userId].acs;
    const winner =
      game.player1.numCorrect > game.player2.numCorrect
        ? 1
        : game.player1.numCorrect === game.player2.numCorrect
        ? 0
        : 2;
    let player1ACSChange = 0;
    let player2ACSChange = 0;
    if (winner === 1) {
      player1ACSChange = Math.round(
        (1 / 150000) * (player1ACS - player2ACS + 1000) ** 2.1
      );
      player2ACSChange = -1 * player1ACSChange;
    } else if (winner === 2) {
      player2ACSChange = Math.round(
        (1 / 150000) * (player2ACS - player1ACS + 1000) ** 2.1
      );
      player1ACSChange = -1 * player2ACSChange;
    }
    return setHHTriviaGameEvaluatedRequest(game._id)
      .then(function (res) {
        dispatch(setHHTriviaGameEvaluatedSuccess(game._id));
        if (winner !== 0) {
          setHHTriviaGameACSChangeRequest(game._id, 1, player1ACSChange);
          setHHTriviaGameACSChangeRequest(game._id, 2, player2ACSChange);
          dispatch(
            setHHTriviaACSChange(game._id, player1ACSChange, player2ACSChange)
          );
          let firstUpdateFunc = null;
          let secondUpdateFunc = null;
          if (curUserId === game.player1.userId) {
            firstUpdateFunc = updateACS;
            secondUpdateFunc = updateOtherACS;
          } else {
            firstUpdateFunc = updateOtherACS;
            secondUpdateFunc = updateACS;
          }
          dispatch(
            firstUpdateFunc(
              game.player1.userId,
              "TRIVIA",
              Math.min(1100, Math.max(100, player1ACS + player1ACSChange))
            )
          );
          dispatch(
            secondUpdateFunc(
              game.player2.userId,
              "TRIVIA",
              Math.min(1100, Math.max(100, player2ACS + player2ACSChange))
            )
          );
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

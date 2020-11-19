import {
  FETCH_COMPLETED_QUESTIONS_STARTED,
  FETCH_COMPLETED_QUESTIONS_SUCCEEDED,
  FETCH_TRIVIA_QUESTIONS_STARTED,
  FETCH_TRIVIA_QUESTIONS_SUCCEEDED,
  UPDATE_QUESTIONS_COMPLETED_STARTED,
  UPDATE_QUESTIONS_COMPLETED_SUCCEEDED,
  SET_TRIVIA_ANSWER,
} from "../constants";
import { showError } from "./error";
import { showSuccess } from "./success";
import { updateACS } from "./acs";

import {
  getCompletedQuestionsRequest,
  getQuestions,
  updateCompletedQuestions,
} from "../api/trivia";

export const getCompletedQuestionsStarted = () => ({
  type: FETCH_COMPLETED_QUESTIONS_STARTED,
});

export const getCompletedQuestionsSucceeded = (questionsCompleted) => ({
  type: FETCH_COMPLETED_QUESTIONS_SUCCEEDED,
  questionsCompleted,
});

export const getQuestionsSucceeded = (questions) => ({
  type: FETCH_TRIVIA_QUESTIONS_SUCCEEDED,
  questions,
});

export const getQuestionsStarted = () => ({
  type: FETCH_TRIVIA_QUESTIONS_STARTED,
});

export const setTriviaAnswer = (text) => ({
  type: SET_TRIVIA_ANSWER,
  selectedAnswer: text,
});

export const updateQuestionsCompletedStarted = () => ({
  type: UPDATE_QUESTIONS_COMPLETED_STARTED,
});

export const updateQuestionsCompletedSucceeded = () => ({
  type: UPDATE_QUESTIONS_COMPLETED_SUCCEEDED,
});

export function getCompletedQuestions(id) {
  return function (dispatch) {
    dispatch(getCompletedQuestionsStarted());
    return getCompletedQuestionsRequest(id)
      .then(function (questionsCompleted) {
        dispatch(getCompletedQuestionsSucceeded(questionsCompleted.data));
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

export function getTriviaQuestions() {
  return function (dispatch) {
    dispatch(getQuestionsStarted());
    return getQuestions()
      .then(function (questions) {
        dispatch(getQuestionsSucceeded(questions.data));
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

export function validateTrivia(question, selectedAnswer, userId, curACS) {
  return function (dispatch) {
    const acsGain = 10;
    const acsLoss = 10;
    if (checkAnswer(question, selectedAnswer)) {
      dispatch(updateACS(userId, "TRIVIA", curACS + acsGain));

      dispatch(showSuccess("Correct!"));
    } else {
      if (curACS >= 100 + acsLoss) {
        dispatch(updateACS(userId, "TRIVIA", curACS - acsLoss));
      }
      const correctAnswer = question.responses.filter(function (response) {
        return response.correct === true;
      });

      dispatch(
        showError("Incorrect: the correct answer was: " + correctAnswer[0].text)
      );
    }
  };
}

export function incrementTriviaQuestion(userId, questionsCompleted) {
  return function (dispatch) {
    dispatch(updateQuestionsCompletedStarted());
    return updateCompletedQuestions(userId, questionsCompleted + 1)
      .then(function () {
        dispatch(updateQuestionsCompletedSucceeded());
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

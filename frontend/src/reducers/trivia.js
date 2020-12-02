import {
  FETCH_COMPLETED_QUESTIONS_SUCCEEDED,
  FETCH_TRIVIA_QUESTIONS_SUCCEEDED,
  SET_TRIVIA_ANSWER,
  TRIVIA_STARTED,
  UPDATE_QUESTIONS_COMPLETED_SUCCEEDED,
  TRIVIA_ENDED,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  questionsCompleted: 0,
  questions: [],
  fetchTriviaQuestionsCompleted: false,
  fetchCompletedQuestionsCompleted: false,
  selectedAnswer: "",
  triviaStarted: false,
});

export const trivia = (state = initState, action) => {
  switch (action.type) {
    case FETCH_COMPLETED_QUESTIONS_SUCCEEDED:
      return state
        .set("questionsCompleted", action.questionsCompleted)
        .set("fetchCompletedQuestionsCompleted", true);
    case FETCH_TRIVIA_QUESTIONS_SUCCEEDED:
      return state
        .set("questions", action.questions)
        .set("fetchTriviaQuestionsCompleted", true);
    case SET_TRIVIA_ANSWER:
      return state.set("selectedAnswer", action.selectedAnswer);
    case UPDATE_QUESTIONS_COMPLETED_SUCCEEDED:
      return state.set(
        "questionsCompleted",
        state.get("questionsCompleted") + 1
      );
    case TRIVIA_STARTED:
      return state.set("triviaStarted", true);
    case TRIVIA_ENDED:
      return state.set("triviaStarted", false);
    default:
      return state;
  }
};

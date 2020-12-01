import { connect } from "react-redux";
import TriviaPage from "../components/trivia-page.component";
import { getCurrentUserProfileFromState } from "../selectors/profileSelector";
import {
  getCompletedQuestions,
  getTriviaQuestions,
  setTriviaAnswer,
  validateTrivia,
  incrementTriviaQuestion,
} from "../actions/trivia";
import {
  getCurrentUserACSScoreFromState,
  getCurrentUserGamesScoreFromState,
} from "../selectors/acsSelectors";

const mapStateToProps = (state) => ({
  profile: getCurrentUserProfileFromState(state),
  acsScore: getCurrentUserACSScoreFromState(state),
  gamesScore: getCurrentUserGamesScoreFromState(state),
  userId: state.auth.get("id"),
  questions: state.trivia.get("questions"),
  questionsCompleted: state.trivia.get("questionsCompleted"),
  fetchCompletedQuestionsCompleted: state.trivia.get(
    "fetchCompletedQuestionsCompleted"
  ),
  fetchTriviaQuestionsCompleted: state.trivia.get(
    "fetchTriviaQuestionsCompleted"
  ),
  selectedAnswer: state.trivia.get("selectedAnswer"),
});
const mapDispatchToProps = (dispatch) => ({
  getCompletedQuestions: (id) => dispatch(getCompletedQuestions(id)),
  validateTrivia: (question, answer, userId, curACS) =>
    dispatch(validateTrivia(question, answer, userId, curACS)),
  getTriviaQuestions: () => dispatch(getTriviaQuestions()),
  setTriviaAnswer: (text) => dispatch(setTriviaAnswer(text)),
  incrementQuestionsCompleted: (id, completed) =>
    dispatch(incrementTriviaQuestion(id, completed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaPage);

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
import { getCurrentUserACSScoreFromState } from "../selectors/acsSelectors";
import { updateACS } from "../actions/acs";
import { closeError } from "../actions/error";
import { closeSuccess } from "../actions/success";

const mapStateToProps = (state) => ({
  profile: getCurrentUserProfileFromState(state),
  acsScore: getCurrentUserACSScoreFromState(state),
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
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
  showSuccess: state.success.get("showSuccess"),
  successReason: state.success.get("successReason"),
});
const mapDispatchToProps = (dispatch) => ({
  getCompletedQuestions: (id) => dispatch(getCompletedQuestions(id)),
  validateTrivia: (question, answer, userId, curACS) =>
    dispatch(validateTrivia(question, answer, userId, curACS)),
  getTriviaQuestions: () => dispatch(getTriviaQuestions()),
  setTriviaAnswer: (text) => dispatch(setTriviaAnswer(text)),
  updateACS: (id, type, acs) => dispatch(updateACS(id, type, acs)),
  closeError: () => {
    dispatch(closeError());
  },
  closeSuccess: () => {
    dispatch(closeSuccess());
  },
  incrementQuestionsCompleted: (id, completed) =>
    dispatch(incrementTriviaQuestion(id, completed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaPage);

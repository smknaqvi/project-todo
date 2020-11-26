import { connect } from "react-redux";
import HHTriviaPage from "../components/hhtrivia-page.component";
import { getCurrentUserACSScoreFromState } from "../selectors/acsSelectors";
import { updateACS } from "../actions/acs";
import { closeError } from "../actions/error";
import { closeSuccess } from "../actions/success";
import {
  getUsersHHTriviaGames,
  deleteHHTriviaGame,
  createHHTriviaGame,
  joinHHTriviaGame,
  startHHTriviaGame,
  setHHTriviaSelectedAnswer,
  incrementHHTriviaCurQuestion,
  setHHTriviaDefaultPage,
  validateHHTriviaAnswer,
  evaluateHHTriviaGame,
} from "../actions/hhtrivia-page";

const mapStateToProps = (state) => ({
  acsScore: getCurrentUserACSScoreFromState(state),
  userId: state.auth.get("id"),
  allGames: state.hhTriviaPage.get("allGames"),
  curGame: state.hhTriviaPage.get("curGame"),
  curQuestion: state.hhTriviaPage.get("curQuestion"),
  selectedAnswer: state.hhTriviaPage.get("selectedAnswer"),
  showGame: state.hhTriviaPage.get("showGame"),
  users: state.hhTriviaPage.get("users"),
  fetchAllGamesFinished: state.hhTriviaPage.get("fetchAllGamesFinished"),
  fetchAllUsersFinished: state.hhTriviaPage.get("fetchAllUsersFinished"),
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
  showSuccess: state.success.get("showSuccess"),
  successReason: state.success.get("successReason"),
});

const mapDispatchToProps = (dispatch) => ({
  updateACS: (id, type, acs) => dispatch(updateACS(id, type, acs)),
  closeError: () => {
    dispatch(closeError());
  },
  closeSuccess: () => {
    dispatch(closeSuccess());
  },
  getUsersHHTriviaGames: (userId) => {
    dispatch(getUsersHHTriviaGames(userId));
  },
  deleteHHTriviaGame: (gameId) => {
    dispatch(deleteHHTriviaGame(gameId));
  },
  createHHTriviaGame: (userId) => {
    dispatch(createHHTriviaGame(userId));
  },
  joinHHTriviaGame: (userId) => {
    dispatch(joinHHTriviaGame(userId));
  },
  startHHTriviaGame: (userId, playerNum) => {
    dispatch(startHHTriviaGame(userId, playerNum));
  },
  setHHTriviaSelectedAnswer: (answer) => {
    dispatch(setHHTriviaSelectedAnswer(answer));
  },
  incrementHHTriviaCurQuestion: () => {
    dispatch(incrementHHTriviaCurQuestion());
  },
  setHHTriviaDefaultPage: () => {
    dispatch(setHHTriviaDefaultPage());
  },
  validateHHTriviaAnswer: (curGame, curQuestion, selectedAnswer, userId) => {
    dispatch(
      validateHHTriviaAnswer(curGame, curQuestion, selectedAnswer, userId)
    );
  },
  evaluateHHTriviaGame: (games, users, gameNum, curUserId) => {
    dispatch(evaluateHHTriviaGame(games, users, gameNum, curUserId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HHTriviaPage);

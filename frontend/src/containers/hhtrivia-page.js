import { connect } from "react-redux";
import HHTriviaPage from "../components/hhtrivia-page.component";
import { getCurrentUserACSScoreFromState } from "../selectors/acsSelectors";
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
});

const mapDispatchToProps = (dispatch) => ({
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

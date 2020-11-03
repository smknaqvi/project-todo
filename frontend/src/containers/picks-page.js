import { connect } from "react-redux";
import PicksPage from "../components/picks-page.component";
import { getACS, updateACS } from "../actions/acs";
import {
  getGames,
  updateDate,
  getDailyPicksFromDB,
  sendDailyPicksToDb,
  updateDailyPicks,
} from "../actions/daily-picks";
import { closeSuccess } from "../actions/success";
import { closeError } from "../actions/error";
import { getCurrentUserACSScoreFromState } from "../selectors/acsSelectors";

const mapStateToProps = (state) => ({
  username: state.auth.get("username"),
  userId: state.auth.get("id"),
  acsScore: getCurrentUserACSScoreFromState(state),
  dailyPicks: state.dailyPicks.get("dailyPicks").toJS(),
  date: state.dailyPicks.get("date"),
  games: state.dailyPicks.get("games"),
  madePicks: state.dailyPicks.get("madePicks"),
  showSuccess: state.success.get("showSuccess"),
  successReason: state.success.get("successReason"),
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
});

const mapDispatchToProps = (dispatch) => ({
  getACS: (id) => dispatch(getACS(id)),
  getGames: () => dispatch(getGames()),
  updateDate: (date) => dispatch(updateDate(date)),
  sendDailyPicksToDb: (userid, pick, madePicks) =>
    dispatch(sendDailyPicksToDb(userid, pick, madePicks)),
  getDailyPicksFromDB: (userid) => dispatch(getDailyPicksFromDB(userid)),
  updateDailyPicks: (pick) => dispatch(updateDailyPicks(pick)),
  updateACS: (userid, type, acsscore) =>
    dispatch(updateACS(userid, type, acsscore)),
  closeSuccess: () => dispatch(closeSuccess()),
  closeError: () => dispatch(closeError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PicksPage);

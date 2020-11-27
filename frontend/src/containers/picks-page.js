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
import { getCurrentUserACSScoreFromState } from "../selectors/acsSelectors";

const mapStateToProps = (state) => ({
  username: state.auth.get("username"),
  userId: state.auth.get("id"),
  acsScore: getCurrentUserACSScoreFromState(state),
  dailyPicks: state.dailyPicks.get("dailyPicks").toJS(),
  date: state.dailyPicks.get("date"),
  games: state.dailyPicks.get("games"),
  madePicks: state.dailyPicks.get("madePicks"),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PicksPage);

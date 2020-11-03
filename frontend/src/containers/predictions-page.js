import { connect } from "react-redux";
import PredictionsPage from "../components/predictions-page.component";
import { getACS, updateACS } from "../actions/acs";
import { getPlayers, updatePicks } from "../actions/team";
import { closeSuccess } from "../actions/success";
import { closeError } from "../actions/error";
import {
  sendPicksToDB,
  getPicksFromDB,
  getWinnersFromDB,
} from "../actions/predictions";
import { getCurrentUserACSScoreFromState } from "../selectors/acsSelectors";

const mapStateToProps = (state) => ({
  username: state.auth.get("username"),
  userId: state.auth.get("id"),
  acsScore: getCurrentUserACSScoreFromState(state),
  players: state.player.get("players"),
  rookies: state.player.get("players").filter((player) => player.rookie),
  awards: state.player.get("awards").toJS(),
  madePicks: state.player.get("madePicks"),
  results: state.player.get("results"),
  showSuccess: state.success.get("showSuccess"),
  successReason: state.success.get("successReason"),
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
  winners: state.player.get("winners"),
  isEvaluated: state.player.get("isEvaluated"),
});

const mapDispatchToProps = (dispatch) => ({
  getACS: (id) => dispatch(getACS(id)),
  getPlayers: () => dispatch(getPlayers()),
  updatePicks: (picks) => dispatch(updatePicks(picks)),
  sendPicksToDB: (year, userid, picks, results, madePicks, isEvaluated) =>
    dispatch(
      sendPicksToDB(year, userid, picks, results, madePicks, isEvaluated)
    ),
  getPicksFromDB: (userid) => dispatch(getPicksFromDB(userid)),
  closeSuccess: () => dispatch(closeSuccess()),
  closeError: () => dispatch(closeError()),
  getWinnersFromDB: (year) => dispatch(getWinnersFromDB(year)),
  updateACS: (userid, type, acsscore) =>
    dispatch(updateACS(userid, type, acsscore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PredictionsPage);

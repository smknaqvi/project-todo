import { connect } from "react-redux";
import OpenCourtPage from "../components/opencourt-page.component";
import { getACS } from "../actions/acs";
import {
  getCurrentUserACSScoreFromState,
  getCurrentUserACSLevelFromState,
} from "../selectors/acsSelectors";

const mapStateToProps = (state) => ({
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
  userId: state.auth.get("id"),
  currentUserACSScore: getCurrentUserACSScoreFromState(state),
  currentUserACSLevel: getCurrentUserACSLevelFromState(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAcs: (id) => dispatch(getACS(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenCourtPage);

import { connect } from "react-redux";
import OpenCourtPage from "../components/opencourt-page.component";
import { getACS } from "../actions/acs";
import {
  getCurrentUserACSScoreFromState,
  getCurrentUserACSLevelFromState,
} from "../selectors/acsSelectors";
import { closeError } from "../actions/error";

const mapStateToProps = (state) => ({
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
  userId: state.auth.get("id"),
  currentUserACSScore: getCurrentUserACSScoreFromState(state),
  currentUserACSLevel: getCurrentUserACSLevelFromState(state),
});

const mapDispatchToProps = (dispatch) => ({
  getAcs: (id) => dispatch(getACS(id)),
  closeError: () => dispatch(closeError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenCourtPage);

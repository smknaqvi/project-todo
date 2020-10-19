import { connect } from "react-redux";
import AcsInfraDemo from "../components/acs-infra-demo.component";
import {
  getCurrentUserACSScoreFromState,
  getCurrentUserACSLevelFromState,
} from "../selectors/acsSelectors";
import { getACS } from "../actions/acs";
import { updateACS } from "../actions/acs";
import { closeError } from "../actions/error";

const mapStateToProps = (state) => ({
  acsScore: getCurrentUserACSScoreFromState(state),
  acsLevel: getCurrentUserACSLevelFromState(state),
  userId: state.auth.get("id"),
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
});

const mapDispatchToProps = (dispatch) => ({
  getACS: (id) => dispatch(getACS(id)),
  updateACS: (id, type, acs) => dispatch(updateACS(id, type, acs)),
  closeError: () => {
    dispatch(closeError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AcsInfraDemo);

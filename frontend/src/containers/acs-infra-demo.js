import { connect } from "react-redux";
import AcsInfraDemo from "../components/acs-infra-demo.component";
import {
  getCurrentUserACSScoreFromState,
  getCurrentUserACSLevelFromState,
} from "../selectors/acsSelectors";
import { getACS } from "../actions/acs";
import { updateACS } from "../actions/acs";

const mapStateToProps = (state) => ({
  acsScore: getCurrentUserACSScoreFromState(state),
  acsLevel: getCurrentUserACSLevelFromState(state),
  userId: state.auth.get("id"),
});

const mapDispatchToProps = (dispatch) => ({
  getACS: (id) => dispatch(getACS(id)),
  updateACS: (id, type, acs) => dispatch(updateACS(id, type, acs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcsInfraDemo);

import { connect } from "react-redux";
import AcsBadge from "../components/acs-badge.component";
import {
  getCurrentUserACSScoreFromState,
  getCurrentUserACSLevelFromState,
} from "../selectors/acsSelectors";
import { acsToLevel } from "../utils/acsUtils";
import { getACS } from "../actions/acs";

const mapStateToProps = (state, { acsScore }) => ({
  acsScore: acsScore ? acsScore : getCurrentUserACSScoreFromState(state),
  acsLevel: acsScore
    ? acsToLevel(acsScore)
    : getCurrentUserACSLevelFromState(state),
  userId: state.auth.get("id"),
});

const mapDispatchToProps = (dispatch) => ({
  getACS: (id) => dispatch(getACS(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcsBadge);

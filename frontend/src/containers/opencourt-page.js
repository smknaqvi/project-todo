import { connect } from "react-redux";
import OpenCourtPage from "../components/opencourt-page.component";
import {
  getCurrentUserACSScoreFromState,
  getCurrentUserACSLevelFromState,
} from "../selectors/acsSelectors";

const mapStateToProps = (state) => ({
  userId: state.auth.get("id"),
  currentUserACSScore: getCurrentUserACSScoreFromState(state),
  currentUserACSLevel: getCurrentUserACSLevelFromState(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OpenCourtPage);

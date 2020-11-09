import { connect } from "react-redux";
import Navbar from "../components/navbar.component";
import { isAuthorized } from "../utils/isAuthorized";
import { getCurrentUserACSScoreFromState } from "../selectors/acsSelectors";
import { getACS } from "../actions/acs";

const mapStateToProps = (state) => ({
  isAuthorized: isAuthorized(),
  acsScore: getCurrentUserACSScoreFromState(state),
  userId: state.auth.get("id"),
});

const mapDispatchToProps = (dispatch) => ({
  getACS: (id) => dispatch(getACS(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

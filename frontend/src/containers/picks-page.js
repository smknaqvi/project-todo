import { connect } from "react-redux";
import PicksPage from "../components/picks-page.component";
import { getACS } from "../actions/acs";
import {
    getCurrentUserACSScoreFromState
  } from "../selectors/acsSelectors";

const mapStateToProps = (state) => (
    {
        username: state.auth.get("username"),
        userId: state.auth.get("id"),
        acsScore: getCurrentUserACSScoreFromState(state)
    });

const mapDispatchToProps = (dispatch) => (
    {
        getACS: (id) => dispatch(getACS(id))
    });

export default connect(mapStateToProps, mapDispatchToProps)(PicksPage);

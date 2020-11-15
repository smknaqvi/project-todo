import { connect } from "react-redux";
import DebatePage from "../components/debate-page.component";
import {
  getResponses,
  getDebatesByUserId,
  getDebatesFromUserIdAndDate,
} from "../actions/debate-page";
import { getRespondedToDebatesFromState } from "../selectors/responseSelectors";
import { getACS, updateACS } from "../actions/acs";

const mapStateToProps = (state) => ({
  userId: state.auth.get("id"),
  date: state.debatePage.get("date"),
  debates: state.debatePage.get("debates"),
  responses: state.debatePage.get("responses"),
  hasResponded: getRespondedToDebatesFromState(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDebatesByUserId: (id) => dispatch(getDebatesByUserId(id)),
  getResponses: () => dispatch(getResponses()),
  getACS: (id) => dispatch(getACS(id)),
  updateACS: (userid, type, acsscore) =>
    dispatch(updateACS(userid, type, acsscore)),
  getDebatesFromUserIdAndDate: (date, userid) =>
    dispatch(getDebatesFromUserIdAndDate(date, userid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DebatePage);

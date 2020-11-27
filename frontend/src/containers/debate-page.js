import { connect } from "react-redux";
import DebatePage from "../components/debate-page.component";
import {
  getResponses,
  getDebatesByUserId,
  getDebatesFromUserIdAndDate,
  getUserResponsesByID,
  evaluateDebate,
  getAssignedResponsesByIDs,
} from "../actions/debate-page";
import { getRespondedToDebatesFromState } from "../selectors/responseSelectors";
import { getACS, updateACS } from "../actions/acs";

const mapStateToProps = (state) => ({
  userId: state.auth.get("id"),
  date: state.debatePage.get("date"),
  debates: state.debatePage.get("debates"),
  curDebate: state.debatePage.get("curDebate"),
  responses: state.debatePage.get("responses"),
  hasResponded: getRespondedToDebatesFromState(state),
  assignedResponses: state.debatePage.get("assignedResponses"),
  curResponseObject: state.debatePage.get("curResponseObject"),
  assignedResponsesObjects: state.debatePage.get("assignedResponsesObjects"),
  retrievedAssignedResponses: state.debatePage.get(
    "retrievedAssignedResponses"
  ),
});

const mapDispatchToProps = (dispatch) => ({
  getDebatesByUserId: (id) => dispatch(getDebatesByUserId(id)),
  getResponses: () => dispatch(getResponses()),
  getACS: (id) => dispatch(getACS(id)),
  updateACS: (userid, type, acsscore) =>
    dispatch(updateACS(userid, type, acsscore)),
  getDebatesFromUserIdAndDate: (date, userid) =>
    dispatch(getDebatesFromUserIdAndDate(date, userid)),
  getUserResponsesByID: (id) => dispatch(getUserResponsesByID(id)),
  evaluateDebate: (id, date) => dispatch(evaluateDebate(id, date)),
  getAssignedResponsesByIDs: (ids) => dispatch(getAssignedResponsesByIDs(ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DebatePage);

import { connect } from "react-redux";
import DebateViewPage from "../components/debate-view-page.component";
import {
  getResponses,
  getDebatesByUserId,
  getDebatesFromUserIdAndDate,
  getAssignedResponsesByIDs,
  evaluateDebate,
  updateRating,
} from "../actions/debate-page";
import { getTwoAssignedResponses } from "../actions/debate-write-page";
import {
  getRespondedToDebatesFromState,
  getMyRespondedToDebatesFromState,
} from "../selectors/responseSelectors";
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
  curResponse: getMyRespondedToDebatesFromState(state),
  retrievedAssignedResponses: state.debatePage.get(
    "retrievedAssignedResponses"
  ),
  isCurDebateEvaluated: state.debatePage.get("isCurDebateEvaluated"),
  retrievedCurDebate: state.debatePage.get("retrievedCurDebate"),
});

const mapDispatchToProps = (dispatch) => ({
  getDebatesByUserId: (id) => dispatch(getDebatesByUserId(id)),
  getResponses: () => dispatch(getResponses()),
  getACS: (id) => dispatch(getACS(id)),
  updateACS: (userid, type, acsscore) =>
    dispatch(updateACS(userid, type, acsscore)),
  getDebatesFromUserIdAndDate: (date, userid) =>
    dispatch(getDebatesFromUserIdAndDate(date, userid)),
  evaluateDebate: (userId, id, date) =>
    dispatch(evaluateDebate(userId, id, date)),
  getAssignedResponsesByIDs: (ids) => dispatch(getAssignedResponsesByIDs(ids)),
  updateRating: (responseId, value, userId) =>
    dispatch(updateRating(responseId, value, userId)),
  getTwoAssignedResponses: (userid, responseid, curdebate) =>
    dispatch(getTwoAssignedResponses(userid, responseid, curdebate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DebateViewPage);

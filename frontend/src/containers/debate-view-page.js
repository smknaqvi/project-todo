import { connect } from "react-redux";
import DebateViewPage from "../components/debate-view-page.component";
import {
  getResponses,
  getDebatesByUserId,
  getDebatesFromUserIdAndDate,
  getAssignedResponsesByIDs,
  evaluateDebate,
  updateRating,
  getPreviousDebatesFromUserIdAndDate,
  getUserResponsesByID,
} from "../actions/debate-page";
import { getTwoAssignedResponses } from "../actions/debate-write-page";
import {
  getRespondedToDebatesFromState,
  getMyRespondedToDebatesFromState,
} from "../selectors/responseSelectors";
import { getACS } from "../actions/acs";

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
  fetchAssignedResponses: state.debatePage.get("fetchAssignedResponses"),
  isShowingPrevDay: state.debatePage.get("isShowingPrevDay"),
  debateResponses: state.debatePage.get("debateResponses"),
});

const mapDispatchToProps = (dispatch) => ({
  getDebatesByUserId: (id) => dispatch(getDebatesByUserId(id)),
  getResponses: () => dispatch(getResponses()),
  getACS: (id) => dispatch(getACS(id)),
  getDebatesFromUserIdAndDate: (date, userid) =>
    dispatch(getDebatesFromUserIdAndDate(date, userid)),
  evaluateDebate: (userId, id, date) =>
    dispatch(evaluateDebate(userId, id, date)),
  getAssignedResponsesByIDs: (ids) => dispatch(getAssignedResponsesByIDs(ids)),
  updateRating: (responseId, value, userId) =>
    dispatch(updateRating(responseId, value, userId)),
  getTwoAssignedResponses: (userid, responseid, curdebate) =>
    dispatch(getTwoAssignedResponses(userid, responseid, curdebate)),
  getPreviousDebatesFromUserIdAndDate: (date, id) => {
    dispatch(getPreviousDebatesFromUserIdAndDate(date, id));
  },
  getUserResponsesByID: (id) => {
    dispatch(getUserResponsesByID(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DebateViewPage);

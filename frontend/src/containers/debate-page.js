import { connect } from "react-redux";
import DebatePage from "../components/debate-page.component";
import {
  getResponses,
  getDebatesByUserId,
  getDebatesFromUserIdAndDate,
  getUserResponsesByID,
  evaluateDebate,
  getAssignedResponsesByIDs,
  getPreviousDebatesFromUserIdAndDate,
  updateDateToToday,
} from "../actions/debate-page";
import { getRespondedToDebatesFromState } from "../selectors/responseSelectors";
import { getCurrentUserACSLevelFromState } from "../selectors/acsSelectors";
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
  retrievedAssignedResponses: state.debatePage.get(
    "retrievedAssignedResponses"
  ),
  debateResponses: state.debatePage.get("debateResponses"),
  isShowingPrevDay: state.debatePage.get("isShowingPrevDay"),
  retrievedCurDebate: state.debatePage.get("retrievedCurDebate"),
  tier: getCurrentUserACSLevelFromState(state),
});

const mapDispatchToProps = (dispatch) => ({
  getDebatesByUserId: (id) => dispatch(getDebatesByUserId(id)),
  getResponses: () => dispatch(getResponses()),
  getACS: (id) => dispatch(getACS(id)),
  getDebatesFromUserIdAndDate: (date, userid) =>
    dispatch(getDebatesFromUserIdAndDate(date, userid)),
  getUserResponsesByID: (id) => dispatch(getUserResponsesByID(id)),
  evaluateDebate: (id, date) => dispatch(evaluateDebate(id, date)),
  getAssignedResponsesByIDs: (ids) => dispatch(getAssignedResponsesByIDs(ids)),
  getPreviousDebatesFromUserIdAndDate: (date, id) => {
    dispatch(getPreviousDebatesFromUserIdAndDate(date, id));
  },
  updateDateToToday: (id) => {
    dispatch(updateDateToToday(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DebatePage);

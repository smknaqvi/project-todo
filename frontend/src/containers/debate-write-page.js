import { connect } from "react-redux";
import { showError } from "../actions/error";
import DebateWritePage from "../components/debate-write-page.component";
import {
  updateDebateResponses,
  uploadResponseAndSaveToDebate,
  populateDebate,
} from "../actions/debate-write-page";
import {
  getDebatesFromUserIdAndDate,
} from "../actions/debate-page";
import { getCurrentUserACSLevelFromState } from "../selectors/acsSelectors";

const mapStateToProps = (state) => ({
  debates: state.debatePage.get("debates"),
  curDebate: state.debatePage.get("curDebate"),
  response: state.debateWritePage.get("response"),
  userId: state.auth.get("id"),
  date: state.debatePage.get("date"),
  tier: getCurrentUserACSLevelFromState(state),
  retrievedCurDebate: state.debatePage.get("retrievedCurDebate"),
});

const mapDispatchToProps = (dispatch) => ({
  updateDebateResponses: (response) => {
    dispatch(updateDebateResponses(response));
  },
  uploadResponseAndSaveToDebate: (debate, response) => {
    dispatch(uploadResponseAndSaveToDebate(debate, response));
  },
  populateDebate: (date, tier, userid) => {
    dispatch(populateDebate(date, tier, userid));
  },
  showError: (errMsg) => {
    dispatch(showError(errMsg));
  },
  getDebatesFromUserIdAndDate: (date, userid) =>
    dispatch(getDebatesFromUserIdAndDate(date, userid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DebateWritePage);

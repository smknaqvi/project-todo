import { connect } from "react-redux";
import {
  getBrackets,
  getUserBracketChoices,
  setSelectedTeam,
  updateBrackets,
} from "../actions/playoffs";
import { getACS, updateACS } from "../actions/acs";
import PlayoffsPage from "../components/playoffs-page.component";
import { getCurrentUserACSScoreFromState } from "../selectors/acsSelectors";
import {
  getBracketOptionsFromState,
  getBracketsObjectFromState,
  getBracketValuesFromState,
  getIsFetchCompletedFromState,
  getIsUpdatingFromState,
} from "../selectors/playoffsSelectors";
import { getUserIdFromState } from "../selectors/authSelectors";
import { closeError } from "../actions/error";
import { closeSuccess } from "../actions/success";

const mapStateToProps = (state) => ({
  userId: getUserIdFromState(state),
  bracketOptions: getBracketOptionsFromState(state),
  bracketValues: getBracketValuesFromState(state),
  bracketAnswers: getBracketsObjectFromState(state),
  isFetchCompleted: getIsFetchCompletedFromState(state),
  isUpdating: getIsUpdatingFromState(state),
  acsScore: getCurrentUserACSScoreFromState(state),
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
  showSuccess: state.success.get("showSuccess"),
  successReason: state.success.get("successReason"),
});
const mapDispatchToProps = (dispatch) => ({
  getBrackets: (year) => dispatch(getBrackets(year)),
  getUserBrackets: (userId) => dispatch(getUserBracketChoices(userId)),
  updateBrackets: (numBrackets, brackets) =>
    dispatch(updateBrackets(numBrackets, brackets)),
  setSelectedTeam: (matchNumber, teamKey, selectedTeam) =>
    dispatch(setSelectedTeam(matchNumber, teamKey, selectedTeam)),
  setSelectedScore: (matchNumber, teamKey, selectedScore) =>
    dispatch(setSelectedTeam(matchNumber, teamKey, selectedScore)),
  getACS: (userId) => dispatch(getACS(userId)),
  updateACS: (userId, type, acsScore) =>
    dispatch(updateACS(userId, type, acsScore)),
  closeError: () => {
    dispatch(closeError());
  },
  closeSuccess: () => {
    dispatch(closeSuccess());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayoffsPage);

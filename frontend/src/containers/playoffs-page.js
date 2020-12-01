import { connect } from "react-redux";
import {
  getBrackets,
  getUserBracketChoices,
  setSelectedTeam,
  updateBrackets,
  getTeamImages,
} from "../actions/playoffs";
import { getACS, updateACS } from "../actions/acs";
import PlayoffsPage from "../components/playoffs-page.component";
import {
  getCurrentUserACSScoreFromState,
  getCurrentUserPPPScoreFromState,
} from "../selectors/acsSelectors";
import {
  getBracketOptionsFromState,
  getBracketsObjectFromState,
  getBracketValuesFromState,
  getIsFetchCompletedFromState,
  getIsUpdatingFromState,
  getTeamImagesFromState,
} from "../selectors/playoffsSelectors";
import { getUserIdFromState } from "../selectors/authSelectors";

const mapStateToProps = (state) => ({
  userId: getUserIdFromState(state),
  bracketOptions: getBracketOptionsFromState(state),
  bracketValues: getBracketValuesFromState(state),
  bracketAnswers: getBracketsObjectFromState(state),
  isFetchCompleted: getIsFetchCompletedFromState(state),
  isUpdating: getIsUpdatingFromState(state),
  acsScore: getCurrentUserACSScoreFromState(state),
  pPPScore: getCurrentUserPPPScoreFromState(state),
  teamImages: getTeamImagesFromState(state),
});
const mapDispatchToProps = (dispatch) => ({
  getBrackets: (year) => dispatch(getBrackets(year)),
  getUserBrackets: (userId) => dispatch(getUserBracketChoices(userId)),
  getTeamImages: () => dispatch(getTeamImages()),
  updateBrackets: (numBrackets, brackets) =>
    dispatch(updateBrackets(numBrackets, brackets)),
  setSelectedTeam: (matchNumber, teamKey, selectedTeam) =>
    dispatch(setSelectedTeam(matchNumber, teamKey, selectedTeam)),
  setSelectedScore: (matchNumber, teamKey, selectedScore) =>
    dispatch(setSelectedTeam(matchNumber, teamKey, selectedScore)),
  getACS: (userId) => dispatch(getACS(userId)),
  updateACS: (userId, type, acsScore) =>
    dispatch(updateACS(userId, type, acsScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayoffsPage);

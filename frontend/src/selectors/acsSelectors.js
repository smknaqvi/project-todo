import { createSelector } from "reselect";
import {
  FANALYST_RANGE,
  ANALYST_RANGE,
  PRO_ANALYST_RANGE,
  EXPERT_ANALYST_RANGE,
} from "../constants";
const getACSFromState = (state) => state.acs;

export const getCurrentUserACSScoreFromState = createSelector(
  [getACSFromState],
  (acs) => {
    return acs.get("currentUserACSScore");
  }
);

export const getCurrentUserACSLevelFromState = createSelector(
  [getCurrentUserACSScoreFromState],
  (acsScore) => {
    if (acsScore <= FANALYST_RANGE.maxScore) {
      return FANALYST_RANGE.name;
    } else if (acsScore <= ANALYST_RANGE.maxScore) {
      return ANALYST_RANGE.name;
    } else if (acsScore <= PRO_ANALYST_RANGE.maxScore) {
      return PRO_ANALYST_RANGE.name;
    } else if (acsScore <= EXPERT_ANALYST_RANGE.maxScore) {
      return EXPERT_ANALYST_RANGE.name;
    }
  }
);

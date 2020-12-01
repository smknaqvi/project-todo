import { createSelector } from "reselect";
import { acsToAggregate, acsToLevel } from "../utils/acsUtils";

const getACSFromState = (state) => state.acs;

export const getCurrentUserGamesScoreFromState = createSelector(
  [getACSFromState],
  (acs) => acs.get("games")
);

export const getCurrentUserAnalysisScoreFromState = createSelector(
  [getACSFromState],
  (acs) => acs.get("analysis")
);

export const getCurrentUserHistoryScoreFromState = createSelector(
  [getACSFromState],
  (acs) => acs.get("history")
);

export const getCurrentUserPPPScoreFromState = createSelector(
  [getACSFromState],
  (acs) => acs.get("pPP")
);

export const getCurrentUserACSScoreFromState = createSelector(
  [getACSFromState],
  acsToAggregate
);

export const getCurrentUserACSLevelFromState = createSelector(
  [getCurrentUserACSScoreFromState],
  acsToLevel
);

import get from "@hs/transmute/get";

import {
  ACS_BREAKDOWN,
  FANALYST_RANGE,
  ANALYST_RANGE,
  PRO_ANALYST_RANGE,
  EXPERT_ANALYST_RANGE,
} from "../constants";

export const acsToAggregate = (acs) =>
  Math.round(
    Object.keys(ACS_BREAKDOWN).reduce(
      (totalAcs, key) =>
        Math.round(totalAcs + ACS_BREAKDOWN[key] * get(key, acs)),
      0
    )
  );

export const acsToLevel = (acsScore) => {
  if (acsScore <= FANALYST_RANGE.maxScore) {
    return FANALYST_RANGE.name;
  } else if (acsScore <= ANALYST_RANGE.maxScore) {
    return ANALYST_RANGE.name;
  } else if (acsScore <= PRO_ANALYST_RANGE.maxScore) {
    return PRO_ANALYST_RANGE.name;
  } else if (acsScore <= EXPERT_ANALYST_RANGE.maxScore) {
    return EXPERT_ANALYST_RANGE.name;
  }
};

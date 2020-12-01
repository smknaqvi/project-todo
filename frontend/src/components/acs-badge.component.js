import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  EXPERT_ANALYST,
  PRO_ANALYST,
  ANALYST,
  FANALYST,
  EXPERT_ANALYST_RANGE,
  PRO_ANALYST_RANGE,
  ANALYST_RANGE,
  FANALYST_RANGE,
} from "../constants";
import Tooltip from "@material-ui/core/Tooltip";
import StarIcon from "@material-ui/icons/Star";
import LockIcon from "@material-ui/icons/Lock";

const acsText = (use, acsLevel, acsScore) => {
  if (!acsScore) {
    return "";
  }
  switch (use) {
    case "all":
      return `${acsLevel} (${acsScore})`;
    case "score":
      return `(${acsScore})`;
    case "tier":
      return `(${acsLevel})`;
    case "none":
    default:
      return "";
  }
};

const AcsIcon = ({ acsLevel }) => {
  let className = "";
  switch (acsLevel) {
    case EXPERT_ANALYST:
      className = "expert-analyst-icon";
      break;
    case PRO_ANALYST:
      className = "pro-analyst-icon";
      break;
    case ANALYST:
      className = "analyst-icon";
      break;
    case FANALYST:
    default:
      className = "fanalyst-icon";
      break;
  }
  return <StarIcon fontSize="large" className={className} />;
};

const AcsTiers = ({ acsScore }) => {
  const [isExpertUnlocked, isProAnalystUnlocked, isAnalystUnlocked] = [
    acsScore >= EXPERT_ANALYST_RANGE.minScore,
    acsScore >= PRO_ANALYST_RANGE.minScore,
    acsScore >= ANALYST_RANGE.minScore,
  ];

  return (
    <div className="triangle">
      <Tooltip
        title={acsText(
          "all",
          EXPERT_ANALYST,
          `${EXPERT_ANALYST_RANGE.minScore} - ${EXPERT_ANALYST_RANGE.maxScore}`
        )}
      >
        <div className={`expert-analyst ${isExpertUnlocked ? "" : "inactive"}`}>
          {isExpertUnlocked ? <StarIcon /> : <LockIcon />}
        </div>
      </Tooltip>
      <Tooltip
        title={acsText(
          "all",
          PRO_ANALYST,
          `${PRO_ANALYST_RANGE.minScore} - ${PRO_ANALYST_RANGE.maxScore}`
        )}
      >
        <div
          className={`pro-analyst ${isProAnalystUnlocked ? "" : "inactive"}`}
        >
          {isProAnalystUnlocked ? <StarIcon /> : <LockIcon />}
        </div>
      </Tooltip>
      <Tooltip
        title={acsText(
          "all",
          ANALYST,
          `${ANALYST_RANGE.minScore} - ${ANALYST_RANGE.maxScore}`
        )}
      >
        <div className={`analyst ${isAnalystUnlocked ? "" : "inactive"}`}>
          {isAnalystUnlocked ? <StarIcon /> : <LockIcon />}
        </div>
      </Tooltip>
      <Tooltip
        title={acsText(
          "all",
          FANALYST,
          `${FANALYST_RANGE.minScore} - ${FANALYST_RANGE.maxScore}`
        )}
      >
        <div className="fanalyst">
          <StarIcon />
        </div>
      </Tooltip>
    </div>
  );
};

export default function AcsBadge({
  acsScore,
  getACS,
  acsLevel,
  userId,
  type = "text",
  use = "all",
}) {
  useEffect(() => {
    !acsScore && userId && getACS(userId);
  }, [getACS, acsScore, userId]);

  switch (type) {
    case "full":
      return (
        <div className="full-badge">
          <AcsTiers acsScore={acsScore} />
          <strong>{acsText(use, acsLevel, acsScore)}</strong>
        </div>
      );
    case "icon":
      return (
        <span>
          <AcsIcon acsLevel={acsLevel} /> {acsText(use, acsLevel, acsScore)}
        </span>
      );
    case "text":
    default:
      return <span>{acsText(use, acsLevel, acsScore)}</span>;
  }
}

AcsBadge.propTypes = {
  acsScore: PropTypes.number,
  acsLevel: PropTypes.string,
  userId: PropTypes.string,
  type: PropTypes.oneOf(["full", "icon", "text"]),
  use: PropTypes.oneOf(["all", "score", "tier", "none"]),
  getACS: PropTypes.func,
};

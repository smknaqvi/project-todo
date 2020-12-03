import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import uniqueId from "@hs/transmute/uniqueId";
import { SCORES } from "../constants";
import bracketStyle from "../themes/bracket-style";

export default function ScoreSelect({
  matchNumber,
  teamKey,
  value,
  handleSetSelectedScore,
  error,
  isLoser,
  disabled,
}) {
  return (
    <Select
      className="select-score"
      value={value}
      onChange={handleSetSelectedScore.bind(null, matchNumber, teamKey)}
      error={error}
      disabled={disabled}
    >
      <MenuItem
        style={{
          backgroundColor: bracketStyle.palette.selector.backgroundColor,
          color: bracketStyle.palette.selector.color,
          text: bracketStyle.palette.selector.text,
        }}
        key={uniqueId("")}
        value={""}
      >
        Choose
      </MenuItem>
      {SCORES.map((score) => {
        if (isLoser && score === 4) {
          return null;
        }
        return (
          <MenuItem
            style={{
              backgroundColor: bracketStyle.palette.selector.backgroundColor,
              color: bracketStyle.palette.selector.color,
              text: bracketStyle.palette.selector.text,
            }}
            key={uniqueId(score)}
            value={score}
          >
            {score}
          </MenuItem>
        );
      })}
    </Select>
  );
}

ScoreSelect.propTypes = {
  matchNumber: PropTypes.number,
  disabled: PropTypes.bool,
  teamKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleSetSelectedScore: PropTypes.func,
  error: PropTypes.bool,
  isLoser: PropTypes.bool,
};

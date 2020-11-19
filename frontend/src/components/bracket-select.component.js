import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import uniqueId from "@hs/transmute/uniqueId";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ScoreSelect from "./score-select.component";
import { getMatchName } from "../utils/bracketsUtils";

export default function BracketSelect({
  options,
  values,
  matchNumber,
  handleSetSelectedTeam,
  handleSetSelectedScore,
  isUpdating,
}) {
  const firstOptions = options[0];
  const secondOptions = options[1];
  const disabled =
    values.isEvaluated ||
    isUpdating ||
    options[0].length === 0 ||
    options[1].length === 0;

  const isError =
    (!!values.teamOneScore || values.teamOneScore === 0) &&
    (!!values.teamTwoScore || values.teamTwoScore === 0) &&
    values.teamOneScore !== 4 &&
    values.teamTwoScore !== 4;

  const borderClass = values.isWinnerCorrect ? "correct" : "wrong";
  const cardClassNames = `bracket-container ${
    values.isEvaluated ? borderClass : ""
  }`;

  const matchName = getMatchName(matchNumber);

  return (
    <Card className={cardClassNames}>
      <Typography variant="h6">{matchName}</Typography>
      <div className="select-container">
        <div>
          <Typography variant="caption" display="block" gutterBottom>
            Teams
          </Typography>
          <Select
            value={values.teamOne}
            onChange={handleSetSelectedTeam.bind(null, matchNumber, "teamOne")}
            disabled={values.isFirstMatch || disabled}
            className="select-team"
            error={!values.teamOne && !!values.teamTwo}
          >
            <MenuItem key={uniqueId("")} value={""}>
              Choose
            </MenuItem>
            {firstOptions.map((option) => (
              <MenuItem key={uniqueId(option)} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Divider orientation="vertical" flexItem />
        <div>
          <Typography variant="caption" display="block" gutterBottom>
            Scores
          </Typography>
          <ScoreSelect
            matchNumber={matchNumber}
            disabled={disabled}
            teamKey="teamOneScore"
            value={values.teamOneScore}
            handleSetSelectedScore={handleSetSelectedScore}
            error={isError}
            isLoser={values.teamTwoScore === 4}
          />
        </div>
      </div>
      <div className="select-container">
        <Select
          value={values.teamTwo}
          onChange={handleSetSelectedTeam.bind(null, matchNumber, "teamTwo")}
          disabled={values.isFirstMatch || disabled}
          className="select-team"
          error={!values.teamTwo && !!values.teamOne}
        >
          <MenuItem key={uniqueId("")} value={""}>
            Choose
          </MenuItem>
          {secondOptions.map((option) => (
            <MenuItem key={uniqueId(option)} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <Divider orientation="vertical" flexItem />
        <ScoreSelect
          matchNumber={matchNumber}
          disabled={disabled}
          teamKey="teamTwoScore"
          value={values.teamTwoScore}
          handleSetSelectedScore={handleSetSelectedScore}
          error={isError}
          isLoser={values.teamOneScore === 4}
        />
      </div>
    </Card>
  );
}

BracketSelect.propTypes = {
  matchNumber: PropTypes.number,
  options: PropTypes.array,
  values: PropTypes.object,
  handleSetSelectedTeam: PropTypes.func,
  handleSetSelectedScore: PropTypes.func,
  isUpdating: PropTypes.bool,
};

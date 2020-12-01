import React, { Component } from "react";
import PropTypes from "prop-types";
import BracketSelect from "./bracket-select.component";
import uniqueId from "@hs/transmute/uniqueId";
import { getNextMatch } from "../utils/bracketsUtils";
import Button from "@material-ui/core/Button";
import { MAX_ACS, MIN_ACS } from "../constants";
import { LoadingWrapper } from "./loading-wrapper.component";

class PlayoffsPage extends Component {
  componentDidMount() {
    const {
      getBrackets,
      getUserBrackets,
      getACS,
      userId,
      acsScore,
      getTeamImages,
    } = this.props;
    getBrackets(new Date().getFullYear());
    getUserBrackets(userId);
    getTeamImages();
    if (!acsScore) {
      getACS(userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isFetchCompleted !== this.props.isFetchCompleted ||
      (this.props.isLoading && this.props.isFetchCompleted)
    ) {
      this.props.setLoading(!this.props.isFetchCompleted);
    }
  }

  handleSetSelectedTeam = (matchNumber, teamKey, { target: { value } }) => {
    const { setSelectedTeam } = this.props;
    const [nextMatch, nextTeamKey] = getNextMatch(matchNumber);

    if (nextMatch <= 15) {
      this.handleSetSelectedTeam(nextMatch, nextTeamKey, {
        target: { value: "" },
      });
    }

    setSelectedTeam(matchNumber, teamKey, value);
  };

  handleSetSelectedScore = (matchNumber, teamKey, { target: { value } }) => {
    const { setSelectedScore } = this.props;
    const [nextMatch, nextTeamKey] = getNextMatch(matchNumber);
    if (value === 4) {
      this.handleSetSelectedTeam(nextMatch, nextTeamKey, {
        target: { value: "" },
      });
    }
    setSelectedScore(matchNumber, teamKey, value);
  };

  handleUpdateBrackets = () => {
    const { bracketValues, updateBrackets } = this.props;

    const brackets = Object.values(bracketValues);
    const { numBrackets, updatedBrackets } = brackets.reduce(
      (acc, bracket) => {
        const { teamOne, teamTwo } = bracket;

        if (teamOne || teamTwo) {
          const numBrackets = acc.numBrackets + 1;
          return {
            numBrackets,
            updatedBrackets: [...acc.updatedBrackets, bracket],
          };
        }

        return acc;
      },
      { numBrackets: 0, updatedBrackets: [] }
    );

    updateBrackets(numBrackets, updatedBrackets);
  };

  handleEvaluateBrackets = () => {
    const {
      bracketValues,
      bracketAnswers,
      updateBrackets,
      updateACS,
      userId,
      pPPScore,
    } = this.props;

    const brackets = Object.values(bracketValues);
    const { acsIncrease, updatedBrackets } = brackets.reduce(
      (acc, bracket) => {
        const {
          teamOne,
          teamTwo,
          teamOneScore,
          teamTwoScore,
          winnerChoice,
          matchNumber,
          isFirstMatch,
        } = bracket;

        const isGameCorrect =
          teamOne === bracketAnswers[matchNumber].teamOne &&
          teamTwo === bracketAnswers[matchNumber].teamTwo;
        const isWinnerCorrect =
          isGameCorrect && winnerChoice === bracketAnswers[matchNumber].winner;
        const isNumGamesCorrect =
          bracketAnswers[matchNumber].teamOneScore +
            bracketAnswers[matchNumber].teamTwoScore ===
          teamOneScore + teamTwoScore;

        const teamKey =
          winnerChoice === teamOne ? "teamOneScore" : "teamTwoScore";
        const isLoserScoreCorrect =
          bracket[teamKey] === bracketAnswers[matchNumber][teamKey];

        const newBracket = {
          ...bracket,
          isEvaluated: true,
          isWinnerCorrect,
          isLoserScoreCorrect,
        };

        let acsIncrease = acc.acsIncrease;
        if (!isFirstMatch && isGameCorrect) {
          acsIncrease += 5;
        } else if (!isFirstMatch) {
          acsIncrease -= 5;
        }

        if (isWinnerCorrect && isNumGamesCorrect) {
          acsIncrease += 10;
        } else if (isWinnerCorrect) {
          acsIncrease += 2;
        } else {
          acsIncrease -= 2;
        }

        return {
          acsIncrease: acsIncrease,
          updatedBrackets: [...acc.updatedBrackets, newBracket],
        };
      },
      { acsIncrease: pPPScore, updatedBrackets: [] }
    );

    const newACSScore = Math.min(Math.max(acsIncrease, MIN_ACS), MAX_ACS);

    updateBrackets(15, updatedBrackets);
    updateACS(userId, "PLAYOFF_BRACKETS", newACSScore);
  };

  createBracketSelects(start, finish) {
    const {
      bracketOptions,
      bracketValues,
      isUpdating,
      teamImages,
    } = this.props;
    const bracketSelects = [];
    for (let i = start; i <= finish; i++) {
      bracketSelects.push(
        <BracketSelect
          key={uniqueId(i)}
          matchNumber={i}
          options={bracketOptions[i]}
          values={bracketValues[i]}
          handleSetSelectedTeam={this.handleSetSelectedTeam}
          handleSetSelectedScore={this.handleSetSelectedScore}
          isUpdating={isUpdating}
          teamImages={teamImages}
        />
      );
    }
    return bracketSelects;
  }

  render() {
    const { isLoading, isUpdating, bracketValues } = this.props;
    const disabled =
      isUpdating || (bracketValues[1] && bracketValues[1].isEvaluated);
    if (!isLoading) {
      return (
        <div className="playoffs-container">
          <div className="brackets-container">
            <div className="brackets-column">
              {this.createBracketSelects(1, 4)}
            </div>
            <div className="brackets-column">
              {this.createBracketSelects(9, 10)}
            </div>
            <div className="brackets-column">
              {this.createBracketSelects(13, 13)}
            </div>
            <div className="brackets-column">
              {this.createBracketSelects(15, 15)}
            </div>
            <div className="brackets-column">
              {this.createBracketSelects(14, 14)}
            </div>
            <div className="brackets-column">
              {this.createBracketSelects(11, 12)}
            </div>
            <div className="brackets-column">
              {this.createBracketSelects(5, 8)}
            </div>
          </div>
          <div className="action-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleUpdateBrackets}
              disabled={disabled}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleEvaluateBrackets}
              disabled={disabled}
            >
              Evaluate
            </Button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

PlayoffsPage.propTypes = {
  userId: PropTypes.string,
  bracketOptions: PropTypes.object,
  bracketValues: PropTypes.object,
  bracketAnswers: PropTypes.object,
  isFetchCompleted: PropTypes.bool,
  isUpdating: PropTypes.bool,
  acsScore: PropTypes.number,
  pPPScore: PropTypes.number,
  getTeamImages: PropTypes.func,
  TeamImages: PropTypes.object,
  getBrackets: PropTypes.func,
  getUserBrackets: PropTypes.func,
  updateBrackets: PropTypes.func,
  setSelectedTeam: PropTypes.func,
  setSelectedScore: PropTypes.func,
  getACS: PropTypes.func,
  updateACS: PropTypes.func,
};

export default LoadingWrapper(PlayoffsPage);

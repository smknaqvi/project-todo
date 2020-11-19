import { createSelector } from "reselect";
import { STARTED, SUCCEEDED } from "../constants";
import { getPreviousMatches } from "../utils/bracketsUtils";
import { getUserIdFromState } from "./authSelectors";

const getPlayoffsFromState = (state) => state.playoffs;

export const getIsFetchCompletedFromState = createSelector(
  [getPlayoffsFromState],
  (playoffs) => {
    return (
      playoffs.get("fetchBracketsApiStatus") === SUCCEEDED &&
      playoffs.get("fetchUserChoicesApiStatus") === SUCCEEDED
    );
  }
);

export const getIsUpdatingFromState = createSelector(
  [getPlayoffsFromState],
  (playoffs) => {
    return playoffs.get("updateApiStatus") === STARTED;
  }
);

export const getBracketsFromState = createSelector(
  [getPlayoffsFromState],
  (playoffs) => {
    return playoffs.get("brackets");
  }
);

export const getBracketsObjectFromState = createSelector(
  [getPlayoffsFromState],
  (playoffs) => {
    return playoffs
      .get("brackets")
      .reduce(
        (acc, bracket) => ({ ...acc, [bracket.matchNumber]: bracket }),
        {}
      );
  }
);

export const getUserBracketChoicesFromState = createSelector(
  [getPlayoffsFromState],
  (playoffs) => {
    return playoffs.get("userBracketChoices");
  }
);

export const getBracketValuesFromState = createSelector(
  [getBracketsFromState, getUserBracketChoicesFromState, getUserIdFromState],
  (brackets, userBracketChoices, userId) => {
    return brackets.reduce((acc, bracket) => {
      const { matchNumber, isFirstMatch } = bracket;

      const teamOne = isFirstMatch
        ? bracket.teamOne
        : userBracketChoices.getIn([`${matchNumber}`, "teamOne"]);
      const teamTwo = isFirstMatch
        ? bracket.teamTwo
        : userBracketChoices.getIn([`${matchNumber}`, "teamTwo"]);

      const teamOneScore = userBracketChoices.getIn([
        `${matchNumber}`,
        "teamOneScore",
      ]);
      const teamTwoScore = userBracketChoices.getIn([
        `${matchNumber}`,
        "teamTwoScore",
      ]);

      return {
        ...acc,
        [matchNumber]: {
          _id: userBracketChoices.getIn([`${matchNumber}`, "_id"]),
          teamOne: teamOne || "",
          teamTwo: teamTwo || "",
          winnerChoice:
            (teamOneScore === 4 && teamOne) ||
            (teamTwoScore === 4 && teamTwo) ||
            "",
          userId,
          isFirstMatch,
          teamOneScore: teamOneScore !== 0 && !teamOneScore ? "" : teamOneScore,
          teamTwoScore: teamTwoScore !== 0 && !teamTwoScore ? "" : teamTwoScore,
          isEvaluated:
            userBracketChoices.getIn([`${matchNumber}`, "isEvaluated"]) ||
            false,
          isWinnerCorrect:
            userBracketChoices.getIn([`${matchNumber}`, "isWinnerCorrect"]) ||
            false,
          matchNumber,
        },
      };
    }, {});
  }
);

export const getBracketOptionsFromState = createSelector(
  [getBracketsFromState, getBracketValuesFromState],
  (brackets, userBracketChoices) => {
    return brackets.reduce((acc, bracket) => {
      const { matchNumber, isFirstMatch } = bracket;

      const [firstPrevMatchNumber, secondPrevMatchNumber] = getPreviousMatches(
        matchNumber
      );

      if (isFirstMatch) {
        return {
          ...acc,
          [matchNumber]: [[bracket.teamOne], [bracket.teamTwo]],
        };
      }

      const firstBracketChoice = userBracketChoices[firstPrevMatchNumber];
      const secondBracketChoice = userBracketChoices[secondPrevMatchNumber];

      const firstBracketTeams = [];
      const secondBracketTeams = [];
      if (firstBracketChoice.winnerChoice) {
        firstBracketTeams.push(firstBracketChoice.winnerChoice);
      } else {
        if (firstBracketChoice.teamOne && firstBracketChoice.teamOne !== "") {
          firstBracketTeams.push(firstBracketChoice.teamOne);
        }
        if (firstBracketChoice.teamTwo && firstBracketChoice.teamTwo !== "") {
          firstBracketTeams.push(firstBracketChoice.teamTwo);
        }
      }

      if (secondBracketChoice.winnerChoice) {
        secondBracketTeams.push(secondBracketChoice.winnerChoice);
      } else {
        if (secondBracketChoice.teamOne && secondBracketChoice.teamOne !== "") {
          secondBracketTeams.push(secondBracketChoice.teamOne);
        }
        if (secondBracketChoice.teamTwo && secondBracketChoice.teamTwo !== "") {
          secondBracketTeams.push(secondBracketChoice.teamTwo);
        }
      }

      return {
        ...acc,
        [matchNumber]: [firstBracketTeams, secondBracketTeams],
      };
    }, {});
  }
);

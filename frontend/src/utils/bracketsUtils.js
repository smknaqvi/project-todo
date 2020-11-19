import {
  EAST_CONFERENCE_QUARTER_FINALS,
  FINAL_MATCH,
  WEST_CONFERENCE_QUARTER_FINALS,
  WEST_CONFERENCE_SEMI_FINALS,
  EAST_CONFERENCE_FIRST_MATCHES,
  EAST_CONFERENCE_SEMI_FINALS,
  WEST_CONFERENCE_FIRST_MATCHES,
} from "../constants";

export function getPreviousMatches(matchNumber) {
  let firstPrevMatchNumber;
  let secondPrevMatchNumber;
  if (FINAL_MATCH.includes(matchNumber)) {
    firstPrevMatchNumber = matchNumber - 2;
    secondPrevMatchNumber = matchNumber - 1;
  } else if (WEST_CONFERENCE_SEMI_FINALS.includes(matchNumber)) {
    firstPrevMatchNumber = matchNumber - 2 * 2;
    secondPrevMatchNumber = matchNumber - 2 * 2 + 1;
  } else if (EAST_CONFERENCE_SEMI_FINALS.includes(matchNumber)) {
    firstPrevMatchNumber = matchNumber - 3;
    secondPrevMatchNumber = matchNumber - 3 + 1;
  } else if (WEST_CONFERENCE_QUARTER_FINALS.includes(matchNumber)) {
    firstPrevMatchNumber = matchNumber - 2 * 4 + (matchNumber - 9);
    secondPrevMatchNumber = matchNumber - 2 * 4 + (matchNumber - 9) + 1;
  } else if (EAST_CONFERENCE_QUARTER_FINALS.includes(matchNumber)) {
    firstPrevMatchNumber = matchNumber - 2 * 3 + (matchNumber - 11);
    secondPrevMatchNumber = matchNumber - 2 * 3 + (matchNumber - 11) + 1;
  }

  return [firstPrevMatchNumber, secondPrevMatchNumber];
}

export function getNextMatch(matchNumber) {
  let nextMatch;
  let nextTeamKey;
  if (WEST_CONFERENCE_SEMI_FINALS.includes(matchNumber)) {
    nextMatch = 15;
    nextTeamKey = "teamOne";
  } else if (EAST_CONFERENCE_SEMI_FINALS.includes(matchNumber)) {
    nextMatch = 15;
    nextTeamKey = "teamTwo";
  } else if (WEST_CONFERENCE_QUARTER_FINALS.includes(matchNumber)) {
    nextMatch = 13;
    nextTeamKey = matchNumber === 9 ? "teamOne" : "teamTwo";
  } else if (EAST_CONFERENCE_QUARTER_FINALS.includes(matchNumber)) {
    nextMatch = 14;
    nextTeamKey = matchNumber === 11 ? "teamOne" : "teamTwo";
  } else if (WEST_CONFERENCE_FIRST_MATCHES.includes(matchNumber)) {
    nextMatch =
      matchNumber +
      2 * 3 +
      Math.max(0, 2 - matchNumber) -
      Math.max(0, matchNumber - 3) +
      1;
    nextTeamKey =
      matchNumber === 1 || matchNumber === 3 ? "teamOne" : "teamTwo";
  } else if (EAST_CONFERENCE_FIRST_MATCHES.includes(matchNumber)) {
    if (matchNumber === 1) {
    } else if (matchNumber === 2) {
    }
    nextMatch =
      matchNumber +
      2 * 2 +
      Math.max(0, 7 - matchNumber) +
      Math.floor(matchNumber / 7) -
      Math.floor(matchNumber / 8);
    nextTeamKey =
      matchNumber === 5 || matchNumber === 7 ? "teamOne" : "teamTwo";
  }
  return [nextMatch, nextTeamKey];
}

export function getMatchName(matchNumber) {
  let firstPrevMatchNumber;
  let secondPrevMatchNumber;
  if (FINAL_MATCH.includes(matchNumber)) {
    return "NBA Finals";
  } else if (WEST_CONFERENCE_SEMI_FINALS.includes(matchNumber)) {
    return "WC F";
  } else if (EAST_CONFERENCE_SEMI_FINALS.includes(matchNumber)) {
    return "EC F";
  } else if (WEST_CONFERENCE_QUARTER_FINALS.includes(matchNumber)) {
    return "WC SF";
  } else if (EAST_CONFERENCE_QUARTER_FINALS.includes(matchNumber)) {
    return "EC SF";
  } else if (WEST_CONFERENCE_FIRST_MATCHES.includes(matchNumber)) {
    return "WC QF";
  } else if (EAST_CONFERENCE_FIRST_MATCHES.includes(matchNumber)) {
    return "EC QF";
  }

  return [firstPrevMatchNumber, secondPrevMatchNumber];
}

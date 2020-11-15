import { createSelector } from "reselect";
import { compareDates } from "../utils/dateUtils";

const getUserIdFromState = (state) => state.auth.get("id");
const getResponsesFromState = (state) => state.debatePage.get("responses");
const getDateFromState = (state) => state.debatePage.get("date");

export const getRespondedToDebatesFromState = createSelector(
  [getUserIdFromState, getResponsesFromState, getDateFromState],
  (userId, responses, date) => {
    const hasResponded = responses.some((response) => {
      return response.user === userId && compareDates(date, response.date);
    });
    return hasResponded;
  }
);

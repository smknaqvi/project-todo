import { createSelector } from "reselect";

const getUserIdFromState = (state) => state.auth.get("id");
const getResponsesFromState = (state) => state.debatePage.get("responses");
const getDateFromState = (state) => state.debatePage.get("date");
const getDebateFromState = (state) => state.debatePage.get("curDebate");

export const getRespondedToDebatesFromState = createSelector(
  [getUserIdFromState, getResponsesFromState, getDateFromState, getDebateFromState],
  (userId, responses, date, curDebate) => {
    
    const hasResponded = responses.some((response) => {
      if(curDebate.length > 0){
        return curDebate[0].responseIds.includes(response._id) && response.user === userId;
      }
      else{
        return false;
      }
      
    });
    return hasResponded;
  }
);

export const getMyRespondedToDebatesFromState = createSelector(
  [getUserIdFromState, getResponsesFromState, getDateFromState, getDebateFromState],
  (userId, responses, date, curDebate) => {
    
    const hasResponded = responses.filter((response) => {
      if(curDebate.length > 0){
        return curDebate[0].responseIds.includes(response._id) && response.user === userId;
      }
      else{
        return false;
      }
      
    });
    return hasResponded;
  }
);
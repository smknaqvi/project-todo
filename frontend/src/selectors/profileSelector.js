import { createSelector } from "reselect";

const getProfileFromState = (state) => state.profile;

export const getCurrentUserProfileFromState = createSelector(
  [getProfileFromState],
  (profile) => {
    return profile.get("profile");
  }
);

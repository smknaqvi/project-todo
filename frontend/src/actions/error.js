import { SHOW_ERROR, CLOSE_ERROR } from "../constants";

export const closeError = () => ({
  type: CLOSE_ERROR,
});

export const showError = (reason) => ({
  type: SHOW_ERROR,
  reason,
});

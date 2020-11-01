import { SHOW_SUCCESS, CLOSE_SUCCESS } from "../constants";

export const closeSuccess = () => ({
  type: CLOSE_SUCCESS,
});

export const showSuccess = (reason) => ({
  type: SHOW_SUCCESS,
  reason,
});

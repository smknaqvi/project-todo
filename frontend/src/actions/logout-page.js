import { removeItem } from "../utils/localStorage";
import { LOGOUT, USER_KEY } from "../constants";

export const logout = () => {
  removeItem(USER_KEY);
  return {
    type: LOGOUT,
  };
};

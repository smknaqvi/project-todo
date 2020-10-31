import store from "../store";
import { getItem } from "../utils/localStorage";
import { USER_KEY } from "../constants";
import { loginSuccess } from "../actions/login-page";

export const isAuthorized = () => {
  const userId = store.getState().auth.get("id");
  if (userId) {
    return true;
  }
  const user = getItem(USER_KEY);
  if (user) {
    store.dispatch(loginSuccess(user.username, user.id));
    return true;
  }
  return false;
};

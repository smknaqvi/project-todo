import {
  TRIGGER_CONFIRMATION_DIALOG,
  CLOSE_CONFIRMATION_DIALOG,
  EMPTY_FUNC,
} from "../constants";

import { Map } from "immutable";

const initState = Map({
  showConfirmationDialog: false,
  dialogMessage: "",
  dialogTitle: "",
  onAcceptChange: EMPTY_FUNC,
  onDeclineChange: EMPTY_FUNC,
});

export const confirmationDialog = (state = initState, action) => {
  switch (action.type) {
    case TRIGGER_CONFIRMATION_DIALOG:
      return state
        .set("showConfirmationDialog", true)
        .set("dialogMessage", action.dialogMessage)
        .set("dialogTitle", action.dialogTitle)
        .set("onAcceptChange", action.onAcceptChange)
        .set("onDeclineChange", action.onDeclineChange);
    case CLOSE_CONFIRMATION_DIALOG:
      return state
        .set("showConfirmationDialog", false)
        .set("dialogMessage", "")
        .set("dialogTitle", "")
        .set("onAcceptChange", EMPTY_FUNC)
        .set("onDeclineChange", EMPTY_FUNC);
    default:
      return state;
  }
};

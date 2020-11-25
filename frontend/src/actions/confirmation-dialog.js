import {
  TRIGGER_CONFIRMATION_DIALOG,
  CLOSE_CONFIRMATION_DIALOG,
  EMPTY_FUNC,
  DEFAULT_CONFIRMATION_DIALOG,
} from "../constants";

export const triggerConfirmationDialog = (params) => ({
  type: TRIGGER_CONFIRMATION_DIALOG,
  dialogMessage: params.dialogMessage || DEFAULT_CONFIRMATION_DIALOG,
  dialogTitle: params.dialogTitle || DEFAULT_CONFIRMATION_DIALOG,
  onAcceptChange: params.onAcceptChange || EMPTY_FUNC,
  onDeclineChange: params.onDeclineChange || EMPTY_FUNC,
});

export const closeConfirmationDialog = () => ({
  type: CLOSE_CONFIRMATION_DIALOG,
});

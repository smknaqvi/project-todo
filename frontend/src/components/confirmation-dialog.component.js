import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
} from "@material-ui/core";

export default class ConfirmationDialog extends Component {
  handleClose = () => {
    this.props.closeConfirmationDialog();
  };

  handleAccept = () => {
    this.props.onAcceptChange();
    this.handleClose();
  };

  handleDecline = () => {
    this.props.onDeclineChange();
    this.handleClose();
  };

  render() {
    const { showConfirmationDialog, dialogMessage, dialogTitle } = this.props;
    return (
      <Dialog open={showConfirmationDialog} onClose={this.handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleDecline}
            variant="contained"
            color="secondary"
          >
            No
          </Button>
          <Button
            onClick={this.handleAccept}
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  showConfirmationDialog: PropTypes.bool,
  onAcceptChange: PropTypes.func,
  onDeclineChange: PropTypes.func,
  dialogMessage: PropTypes.string,
  dialogTitle: PropTypes.string,
};

import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import Alert from "./alert.component";

export default class AlertSnackbar extends Component {
  render() {
    return (
      <div className="alert">
        <Snackbar
          open={this.props.showError}
          autoHideDuration={5000}
          onClose={this.props.closeError}
        >
          <Alert severity="error" onClose={this.props.closeError}>
            {this.props.errorReason}
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.props.showSuccess}
          autoHideDuration={2000}
          onClose={this.props.closeSuccess}
        >
          <Alert onClose={this.props.closeSuccess} severity="success">
            {this.props.successReason}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

AlertSnackbar.propTypes = {
  showError: PropTypes.bool,
  errorReason: PropTypes.string,
  closeError: PropTypes.func,
  showSuccess: PropTypes.bool,
  successReason: PropTypes.string,
  closeSuccess: PropTypes.func,
};

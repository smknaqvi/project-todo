import React, { Component } from "react";
import OpenCourtTimeline from "../containers/opencourt-timeline";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import Alert from "./alert.component";

export default class OpenCourtPage extends Component {
  render() {
    return (
      <div className="ocpage">
        <OpenCourtTimeline />
        <Snackbar
          open={this.props.showError}
          autoHideDuration={5000}
          onClose={this.props.closeError}
        >
          <Alert severity="error" onClose={this.props.closeError}>
            {this.props.errorReason}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

OpenCourtPage.propTypes = {
  showError: PropTypes.bool,
  closeError: PropTypes.func,
  errorReason: PropTypes.string,
};

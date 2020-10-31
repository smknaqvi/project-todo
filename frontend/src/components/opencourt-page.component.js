import React, { Component } from "react";
import OpenCourtTimeline from "../containers/opencourt-timeline";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import Alert from "./alert.component";
import CreatePost from "../containers/create-post";

export default class OpenCourtPage extends Component {
  componentDidMount() {
    if (!this.currentUserACSScore) {
      this.props.getAcs(this.props.userId);
    }
  }

  render() {
    return (
      <div className="oc-page">
        <CreatePost
          acsLevel={this.props.currentUserACSLevel}
          acsScore={this.props.currentUserACSScore}
        />
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
  getAcs: PropTypes.func,
  currentUserACSLevel: PropTypes.string,
  currentUserACSScore: PropTypes.number,
  userId: PropTypes.string,
};

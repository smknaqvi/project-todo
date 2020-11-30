import React, { Component } from "react";
import OpenCourtTimeline from "../containers/opencourt-timeline";
import PropTypes from "prop-types";
import CreatePost from "../containers/create-post";

export default class OpenCourtPage extends Component {
  render() {
    return (
      <div className="oc-page">
        <CreatePost
          acsLevel={this.props.currentUserACSLevel}
          acsScore={this.props.currentUserACSScore}
        />
        <OpenCourtTimeline />
      </div>
    );
  }
}
OpenCourtPage.propTypes = {
  getAcs: PropTypes.func,
  currentUserACSLevel: PropTypes.string,
  currentUserACSScore: PropTypes.number,
  userId: PropTypes.string,
};

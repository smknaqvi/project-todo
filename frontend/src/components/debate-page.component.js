import React, { Component } from "react";
import DebateWritePage from "../containers/debate-write-page.js";
import PropTypes from "prop-types";
import DebateViewPage from "../containers/debate-view-page";

export default class DebatePage extends Component {
  componentDidMount() {
    const {
      userId,
      acsScore,
      getACS,
      getResponses,
      date,
      getDebatesFromUserIdAndDate,
      getDebatesByUserId,
    } = this.props;
    getDebatesFromUserIdAndDate(
      date ? new Date(date) : new Date(),
      this.props.userId
    );
    if (!acsScore) {
      getACS(userId);
    }

    getDebatesByUserId(userId);
    getResponses();
  }

  createDisplayPage() {
    if (this.props.hasResponded) {
      return <DebateViewPage />;
    } else {
      return <DebateWritePage />;
    }
  }

  render() {
    return <div className="debate-page">{this.createDisplayPage()}</div>;
  }
}

DebatePage.propTypes = {
  userId: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  debates: PropTypes.array,
  response: PropTypes.array,
  hasResponded: PropTypes.bool,
  getDebatesByUserId: PropTypes.func,
  getResponses: PropTypes.func,
  getACS: PropTypes.func,
  updateACS: PropTypes.func,
  getDebatesFromUserIdAndDate: PropTypes.func,
};

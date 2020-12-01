import React, { Component } from "react";
import DebateWritePage from "../containers/debate-write-page.js";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
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

  changeDateToYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.props.getPreviousDebatesFromUserIdAndDate(date, this.props.userId);
  };

  changeDateToToday = () => {
    this.props.updateDateToToday(this.props.userId);
  };

  createChangeDayButton() {
    if (this.props.isShowingPrevDay) {
      return <Button onClick={this.changeDateToToday}>Today's Debate</Button>;
    } else {
      return (
        <Button onClick={this.changeDateToYesterday}>
          Yesterday's Results
        </Button>
      );
    }
  }

  render() {
    return (
      <div className="debate-page">
        {this.createChangeDayButton()}
        {this.createDisplayPage()}
      </div>
    );
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
  getDebatesFromUserIdAndDate: PropTypes.func,
};

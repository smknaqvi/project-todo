import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Map } from "immutable";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, Button } from "@material-ui/core";

export default class DebateWritePage extends Component {
  componentDidUpdate() {
    const { curDebate, date, tier, userId, retrievedCurDebate } = this.props;
    // If the date has changed
    if (retrievedCurDebate) {
      // Check if the user has a debate assignment to them on this given date
      this.checkDebateUpdate(curDebate, date, tier, userId);
    }
  }

  checkDebateUpdate = (curDebate, date, tier, userId) => {
    if (curDebate.length === 0) {
      this.props.populateDebate(date ? date : new Date(), tier, userId);
    }
  };

  updateResponse = ({ target: { value } }) => {
    this.props.updateDebateResponses(value);
  };

  submitResponse = () => {
    const debate = this.props.curDebate[0];
    const response = {
      user: this.props.userId,
      content: this.props.response,
      count: 0,
      ratings: new Map(),
      date: this.props.date,
    };
    this.props.uploadResponseAndSaveToDebate(debate, response);
  };

  render() {
    if (this.props.curDebate.length > 0) {
      const curDebate = this.props.curDebate[0];
      return (
        <Card variant="outlined">
          <CardHeader title={curDebate.question}></CardHeader>
          <CardContent className="debate-responses">
            <TextField
              id="outlined-textarea"
              label="Create your Debate Response"
              placeholder="Start your response..."
              onChange={this.updateResponse}
              value={this.props.response ? this.props.response : ""}
              rows={4}
              multiline={true}
              fullWidth={true}
              variant="outlined"
            />
          </CardContent>
          <Button variant="contained" onClick={this.submitResponse}>
            Submit Response
          </Button>
        </Card>
      );
    } else {
      return <div>No Debate Today!</div>;
    }
  }
}

DebateWritePage.propTypes = {
  debates: PropTypes.array,
  curDebate: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  response: PropTypes.string,
  userId: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  tier: PropTypes.string,
  retrievedCurDebate: PropTypes.bool,
  updateDebateResponses: PropTypes.func,
  uploadResponseAndSaveToDebate: PropTypes.func,
  populateDebate: PropTypes.func,
};

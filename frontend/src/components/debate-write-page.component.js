import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Map } from "immutable";
import PropTypes from "prop-types";
import {
  DEBATE_CHARACTER_LIMIT_MIN,
  DEBATE_CHARACTER_LIMIT_MAX,
} from "../constants";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

export default class DebateWritePage extends Component {
  componentDidMount() {
    const { curDebate, tier, userId, retrievedCurDebate } = this.props;
    // If the date has changed
    if (retrievedCurDebate) {
      // Check if the user has a debate assignment to them on this given date
      this.checkDebateUpdate(curDebate, tier, userId);
    }
  }

  checkDebateUpdate = (curDebate, tier, userId) => {
    if (curDebate.length === 0) {
      this.props.populateDebate(new Date(), tier, userId);
    }
  };

  updateResponse = ({ target: { value } }) => {
    this.props.updateDebateResponses(value);
  };

  submitResponse = () => {
    if (this.props.response === "") {
      this.props.showError("Cannot submit empty response");
    } else {
      const debate = this.props.curDebate[0];
      const response = {
        user: this.props.userId,
        content: this.props.response,
        count: 0,
        ratings: new Map(),
        date: this.props.date,
      };
      this.props.uploadResponseAndSaveToDebate(debate, response);
    }
  };
  createInvalidLengthMsg = () => {
    const responseLength = this.props.response.trim().length;
    if (responseLength > DEBATE_CHARACTER_LIMIT_MAX) {
      return (
        <Typography className="error-msg">
          Response cannot exceed 500 Characters.
        </Typography>
      );
    } else if (
      responseLength < DEBATE_CHARACTER_LIMIT_MIN &&
      responseLength !== 0
    ) {
      return (
        <Typography className="error-msg">
          Response must be at least 100 Characters.
        </Typography>
      );
    }
  };

  render() {
    if (this.props.curDebate.length > 0) {
      const curDebate = this.props.curDebate[0];
      const responseLength = this.props.response.trim().length;
      const notValid =
        responseLength > DEBATE_CHARACTER_LIMIT_MAX ||
        (responseLength < DEBATE_CHARACTER_LIMIT_MIN && responseLength !== 0);
      const submitClassName =
        notValid || responseLength === 0
          ? "debate-create-button-invalid"
          : "debate-create-button";
      return (
        <Card className="debate-create" variant="outlined">
          <CardHeader
            className="debate-create-header"
            title={curDebate.question}
          ></CardHeader>
          <CardContent className="debate-create-content">
            <TextField
              id="outlined-textarea"
              label="Create your Debate Response"
              placeholder="Start your response..."
              onChange={this.updateResponse}
              value={this.props.response ? this.props.response : ""}
              rows={4}
              helperText={`Characters: ${responseLength}/${DEBATE_CHARACTER_LIMIT_MAX}`}
              multiline={true}
              fullWidth={true}
              variant="outlined"
            />
            {this.createInvalidLengthMsg()}
          </CardContent>
          <Button
            className={submitClassName}
            variant="contained"
            onClick={this.submitResponse}
            disabled={notValid || responseLength === 0}
          >
            Submit Response
          </Button>
        </Card>
      );
    } else {
      if (!this.props.retrievedCurDebate) {
        this.checkDebateUpdate(
          this.props.curDebate,
          this.props.tier,
          this.props.userId
        );
      }
      return <div>No debate</div>;
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

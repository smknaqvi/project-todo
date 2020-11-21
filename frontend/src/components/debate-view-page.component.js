import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./alert.component";
import Divider from "@material-ui/core/Divider";

export default class DebateViewPage extends Component {
  componentDidMount() {
    const {
      userId,
      acsScore,
      getACS,
      getAssignedResponsesByIDs,
      retrievedCurDebate,
      getDebatesFromUserIdAndDate,
      date,
    } = this.props;
    if (!acsScore) {
      getACS(userId);
    }
    getAssignedResponsesByIDs(userId);
    if (!retrievedCurDebate) {
      getDebatesFromUserIdAndDate(date ? new Date(date) : new Date(), userId);
    }
  }

  SimpleCard() {
    return (
      <Card className="debate-question">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <u>
              <b>Original Question:</b>
            </u>{" "}
            {this.createDebates()}
          </Typography>
          <Typography gutterBottom>
            Your Response: {this.props.curResponse[0].content}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  createDebates = () => {
    if (this.props.curDebate.length > 0) {
      return this.props.curDebate[0].question;
    } else {
      return "No questions for: " + this.props.date;
    }
  };

  createResponses = () => {
    if (this.props.curDebate.length > 0) {
      const curDebate = this.props.curDebate[0];
      if (curDebate.responseIds.length > 2) {
        if (this.props.retrievedAssignedResponses) {
          return this.props.assignedResponsesObjects.map((response) => {
            if (curDebate.responseIds.includes(response._id)) {
              return (
                <Card className="response" key={response._id}>
                  <CardContent className="response-content" key={response._id}>
                    Their Response : {response.content}
                  </CardContent>
                  <Divider />
                  {this.DiscreteSlider(response._id)}
                </Card>
              );
            } else {
              return <div />;
            }
          });
        } else {
          this.props.getTwoAssignedResponses(
            this.props.userId,
            this.props.curResponse[0],
            this.props.curDebate[0]
          );
        }
      } else {
        return (
          <Card>
            <CardContent>
              <Typography
                className={"title"}
                color="textSecondary"
                gutterBottom
              >
                Congrats! You are one of the first responses. Please check back
                later to rate other people's responses.
              </Typography>
            </CardContent>
          </Card>
        );
      }
    }
  };

  handleEvaluate = () => {
    const curDebate = this.props.curDebate[0];
    if (!curDebate.isEvaluated) {
      this.props.evaluateDebate(
        this.props.userId,
        curDebate._id,
        new Date(this.props.date)
      );
    }
  };

  DiscreteSlider(responseid) {
    const submitRating = (value, responseId) => {
      this.props.updateRating(responseId, value, this.props.userId);
    };

    let value = 50;

    let handleChange = (event, newvalue) => {
      value = newvalue;
    };
    if (!this.props.curDebate[0].isEvaluated) {
      return (
        <div className="debate-slider">
          <Typography id="discrete-slider-always" gutterBottom>
            Agreeness
          </Typography>
          <Slider
            defaultValue={50}
            aria-labelledby="discrete-slider-always"
            onChange={(event, value) => handleChange(event, value)}
            step={5}
            valueLabelDisplay="on"
            id={responseid}
          />
          <Button
            className="rate-debate-btn"
            id={responseid}
            onClick={() => submitRating(value, responseid)}
          >
            Submit Rating
          </Button>
        </div>
      );
    }
  }
  createEvaluateButton = () => {
    if (this.props.retrievedCurDebate) {
      const disable = this.props.retrievedCurDebate
        ? this.props.curDebate[0].isEvaluated
        : false;
      return (
        <Button
          className="debate-evaluate-btn"
          variant="contained"
          color="primary"
          onClick={() => this.handleEvaluate()}
          disabled={disable}
        >
          Evaluate
        </Button>
      );
    }
  };

  render() {
    return (
      <div className="debate-view-page">
        {this.SimpleCard()}
        {this.createResponses()}
        {this.createEvaluateButton()}
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

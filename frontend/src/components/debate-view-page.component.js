import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
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
      getPreviousDebatesFromUserIdAndDate,
    } = this.props;
    if (!acsScore) {
      getACS(userId);
    }
    getAssignedResponsesByIDs(userId);

    if (this.props.isShowingPrevDay) {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      getPreviousDebatesFromUserIdAndDate(date, userId);
    }
    if (!retrievedCurDebate) {
      if (this.props.isShowingPrevDay) {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        getPreviousDebatesFromUserIdAndDate(date, userId);
      } else {
        getDebatesFromUserIdAndDate(date ? new Date(date) : new Date(), userId);
      }
    }
  }

  createAvg() {
    if (
      this.props.curDebate.length > 0 &&
      this.props.curDebate[0].isEvaluated &&
      this.props.isShowingPrevDay
    ) {
      return (
        <Typography>
          Average :{" "}
          {this.props.curResponse[0].avg ? this.props.curResponse[0].avg : 0}%
        </Typography>
      );
    }
  }

  SimpleCard() {
    if (this.props.curResponse.length > 0) {
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
            {this.createAvg()}
          </CardContent>
        </Card>
      );
    } else if (this.props.curDebate.length > 0) {
      this.props.getUserResponsesByID(this.props.userId);
    }
  }

  createDebates = () => {
    if (this.props.curDebate.length > 0) {
      return this.props.curDebate[0].question;
    } else {
      this.props.getDebatesFromUserIdAndDate(
        this.props.date ? new Date(this.props.date) : new Date(),
        this.props.userId
      );
    }
  };

  createUserName = (response) => {
    if (this.props.isShowingPrevDay) {
      const avg = response.avg ? response.avg : 0;
      return (
        <Typography className={"title"} color="textSecondary" gutterBottom>
          User : {response.userName}-{avg}%
        </Typography>
      );
    }
  };

  createResponseCards = (responses, viewAssignedOnly) => {
    return responses.map((response) => {
      if (
        (viewAssignedOnly &&
          this.props.curDebate.length > 0 &&
          this.props.curDebate[0].responseIds.includes(response._id)) ||
        !viewAssignedOnly
      ) {
        return (
          <Card className="response" key={response._id}>
            <CardContent className="response-content" key={response._id}>
              {this.createUserName(response)}
              Their Response : {response.content}
            </CardContent>
            <Divider />
            {this.DiscreteSlider(response._id)}
          </Card>
        );
      } else {
        return null;
      }
    });
  };

  renderEarlyResponseMessage = () => {
    return (
      <Card>
        <CardContent>
          <Typography className={"title"} color="textSecondary" gutterBottom>
            Congrats! You are one of the first responses. Please check back
            later to rate other people's responses.
          </Typography>
        </CardContent>
      </Card>
    );
  };

  createResponses = () => {
    if (this.props.curDebate.length > 0) {
      const curDebate = this.props.curDebate[0];
      if (curDebate.responseIds.length > 2) {
        if (this.props.isShowingPrevDay) {
          // if we are showing a prev day, show every response associated with this debate
          return this.createResponseCards(this.props.debateResponses, false);
        } else if (this.props.retrievedAssignedResponses) {
          // if we are not showing a previous day, render only the assigned responses
          return this.createResponseCards(
            this.props.assignedResponsesObjects,
            true
          );
        } else {
          this.props.getTwoAssignedResponses(
            this.props.userId,
            this.props.curResponse[0],
            this.props.curDebate[0]
          );
        }
      } else {
        return this.renderEarlyResponseMessage();
      }
    }
  };

  handleEvaluate = () => {
    const curDebate = this.props.curDebate[0];
    if (!curDebate.isEvaluated && !this.props.isShowingPrevDay) {
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
    if (
      this.props.retrievedCurDebate &&
      this.props.curDebate.length > 0 &&
      !this.props.isShowingPrevDay
    ) {
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
      </div>
    );
  }
}

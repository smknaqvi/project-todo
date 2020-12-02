import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, LinearProgress } from "@material-ui/core";

export default class HHTriviaQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 10 };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick = () => {
    if (this.state.seconds > 0) {
      this.setState((prevState) => {
        return { seconds: prevState.seconds - 1 };
      });
    } else {
      this.props.validateTriviaAnswer();
      this.setState({ seconds: 10 });
    }
  };
  submitButtonClicked = () => {
    this.props.validateTriviaAnswer();
    this.setState({ seconds: 10 });
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }
  normalise = (value) => (value * 100) / 10;

  render() {
    return (
      <div className="trivia-question">
        <div className="question-header">
          <div style={{ width: "100%", textAlign: "center" }}>
            <LinearProgress
              variant="determinate"
              value={this.normalise(this.state.seconds)}
            />
          </div>
          {this.props.currentQuestion.question}
        </div>
        <div className="response-options">
          {this.props.currentQuestion.responses.map((response) => (
            <Button
              key={response.text}
              className={
                response.text === this.props.selectedAnswer
                  ? "response-button-selected"
                  : "response-button-default"
              }
              variant="contained"
              onClick={() => this.props.setTriviaAnswer(response.text)}
            >
              {response.text}
            </Button>
          ))}
        </div>
        <div className="trivia-buttons">
          <Button
            ref={(input) => (this.inputElement = input)}
            className="trivia-next-button"
            onClick={this.submitButtonClicked}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
HHTriviaQuestion.propTypes = {
  currentQuestion: PropTypes.object,
  getCurrentQuestion: PropTypes.func,
  completedQuestions: PropTypes.number,
  gotQuestionCompleted: PropTypes.bool,
};

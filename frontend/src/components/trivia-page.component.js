import React, { Component } from "react";
import TriviaQuestion from "../containers/trivia-question";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import checkmarkgif from "../videos/checkmarkgif.mp4";

export default class TriviaPage extends Component {
  componentDidMount() {
    this.props.getTriviaQuestions();
    this.props.getCompletedQuestions(this.props.userId);
  }

  render() {
    if (
      this.props.fetchCompletedQuestionsCompleted &&
      this.props.fetchTriviaQuestionsCompleted
    ) {
      const { questions, questionsCompleted } = this.props;
      if (questionsCompleted < questions.length) {
        const { userId, selectedAnswer } = this.props;
        const currentQuestion = this.props.questions[questionsCompleted];
        return (
          <div className="trivia-page-container">
            <div className="trivia-page-header">
              Questions Completed Today: {questionsCompleted}
            </div>
            <div className="trivia-question-container">
              <TriviaQuestion
                currentQuestion={currentQuestion}
                selectedAnswer={selectedAnswer}
                setTriviaAnswer={this.props.setTriviaAnswer}
                validateTriviaAnswer={() => {
                  this.props.validateTrivia(
                    currentQuestion,
                    selectedAnswer,
                    userId,
                    this.props.acsScore
                  );
                  this.props.incrementQuestionsCompleted(
                    userId,
                    questionsCompleted
                  );
                  this.props.setTriviaAnswer("");
                }}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="trivia-page-container">
            <div className="trivia-page-header">Thanks for Playing</div>
            <div className="trivia-questions-complete-container">
              <div className="checkmark">
                <video loop autoPlay muted>
                  <source src={checkmarkgif} type="video/mp4" />
                  Your browser does not support the video tag. I suggest you
                  upgrade your browser.
                </video>
              </div>
              No more questions for today. See you tomorrow!
            </div>
          </div>
        );
      }
    } else {
      return <CircularProgress />;
    }
  }
}
TriviaPage.propTypes = {
  getProfile: PropTypes.func,
  profile: PropTypes.object,
  fetchCompleted: PropTypes.bool,
};

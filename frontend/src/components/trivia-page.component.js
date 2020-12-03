import React, { Component } from "react";
import TriviaQuestion from "../containers/trivia-question";
import PropTypes from "prop-types";
import { LoadingWrapper } from "./loading-wrapper.component";
import checkmarktransparent from "../images/checkmarktransparent.gif";
import { Button } from "@material-ui/core";

class TriviaPage extends Component {
  constructor(props) {
    super(props);
    this.state = { questionSubmitted: false };
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentCleanup() {
    if (this.props.triviaStarted) {
      this.nextQuestion();
      this.props.endTrivia();
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.componentCleanup);
    this.props.getTriviaQuestions();
    this.props.getCompletedQuestions(this.props.userId);
  }
  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }
  nextQuestion = () => {
    this.props.incrementQuestionsCompleted(
      this.props.userId,
      this.props.questionsCompleted
    );
    this.props.setTriviaAnswer("");
    this.setState({ questionSubmitted: false });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.fetchCompletedQuestionsCompleted !==
        this.props.fetchCompletedQuestionsCompleted ||
      prevProps.fetchTriviaQuestionsCompleted !==
        this.props.fetchTriviaQuestionsCompleted ||
      (this.props.isLoading &&
        this.props.fetchTriviaQuestionsCompleted &&
        this.props.fetchCompletedQuestionsCompleted)
    ) {
      this.props.setLoading(
        !(
          this.props.fetchTriviaQuestionsCompleted &&
          this.props.fetchCompletedQuestionsCompleted
        )
      );
    }
  }

  render() {
    if (!this.props.triviaStarted && !this.props.isLoading) {
      const { questionsCompleted } = this.props;
      return (
        <div className="trivia-page-container">
          <div className="trivia-page-header">
            <div className="welcome-header">Welcome to Trivia!</div>
            <div className="questions-completed">
              You've completed {questionsCompleted} questions today
            </div>

            <div>
              <Button
                variant="contained"
                color="primary"
                className="trivia-start-button"
                onClick={this.props.startTrivia}
              >
                Start
              </Button>
            </div>
          </div>
        </div>
      );
    } else if (!this.props.isLoading) {
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
                    this.props.gamesScore
                  );
                  this.setState({ questionSubmitted: true });
                }}
              />
              <div className="trivia-next-button-container">
                <Button
                  variant="contained"
                  className="trivia-next-button"
                  onClick={this.nextQuestion}
                  color="primary"
                  disabled={!this.state.questionSubmitted}
                >
                  Next Question
                </Button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="trivia-page-container">
            <div className="trivia-page-header">Thanks for Playing</div>
            <div className="trivia-questions-complete-container">
              <div className="checkmark">
                <img src={checkmarktransparent} alt="alternate" />
              </div>
              No more questions for now. Please check back later!
            </div>
          </div>
        );
      }
    } else {
      return null;
    }
  }
}
TriviaPage.propTypes = {
  getProfile: PropTypes.func,
  profile: PropTypes.object,
  fetchCompleted: PropTypes.bool,
  gamesScore: PropTypes.number,
  triviaStarted: PropTypes.bool,
};

export default LoadingWrapper(TriviaPage);

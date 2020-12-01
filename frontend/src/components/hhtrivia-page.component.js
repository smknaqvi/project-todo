import React, { Component } from "react";
import TriviaQuestion from "../containers/trivia-question";
import { CircularProgress } from "@material-ui/core";
import checkmarkgif from "../videos/checkmarkgif.mp4";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { acsToAggregate } from "../utils/acsUtils";

export default class HHTriviaPage extends Component {
  componentDidMount() {
    this.props.getUsersHHTriviaGames(this.props.userId);
  }

  componentWillUnmount() {
    this.props.setHHTriviaDefaultPage();
  }

  createTriviaQuestion() {
    const questions = this.props.curGame.questions;
    if (this.props.curQuestion < questions.length) {
      const currentQuestion = questions[this.props.curQuestion];
      return (
        <div className="hhtrivia-page-container">
          <div className="hhtrivia-question-container">
            <TriviaQuestion
              currentQuestion={currentQuestion}
              selectedAnswer={this.props.selectedAnswer}
              setTriviaAnswer={this.props.setHHTriviaSelectedAnswer}
              validateTriviaAnswer={() => {
                this.props.validateHHTriviaAnswer(
                  this.props.curGame,
                  this.props.curQuestion,
                  this.props.selectedAnswer,
                  this.props.userId
                );
                this.props.incrementHHTriviaCurQuestion();
                this.props.setHHTriviaSelectedAnswer("");
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="trivia-questions-complete-container">
          Trivia Game Complete!
          <div className="checkmark">
            <video loop autoPlay muted>
              <source src={checkmarkgif} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <Button
            className="hhtrivia-return-button"
            onClick={this.props.setHHTriviaDefaultPage}
            variant="contained"
          >
            Return
          </Button>
        </div>
      );
    }
  }

  createAccordionActions(game, playerNum) {
    const bothFinished = game.player1.startedGame && game.player2.startedGame;
    const pending = !game.player1.userId || !game.player2.userId;
    const curUserFinished =
      playerNum === 1 ? game.player1.startedGame : game.player2.startedGame;
    const opponentFinished =
      playerNum === 1 ? game.player2.startedGame : game.player1.startedGame;
    let actionButtons = null;
    if (bothFinished) {
      const acsChange =
        playerNum === 1 ? game.player1.acsChange : game.player2.acsChange;
      const acsChangeText = acsChange >= 0 ? "+" + acsChange : acsChange;
      const acsChangeMessage =
        acsChange === 0
          ? "You tied or you were too high ranked"
          : acsChange >= 0
          ? "You Won!"
          : "You lost.";
      const acsChangeClass =
        acsChange === 0
          ? "trivia-tied-message"
          : acsChange >= 0
          ? "trivia-won-message"
          : "trivia-lost-message";
      actionButtons = (
        <>
          <Typography>{acsChangeMessage}</Typography>
          <Typography className={acsChangeClass}>{acsChangeText}</Typography>
        </>
      );
    } else if (pending) {
      actionButtons = (
        <>
          <Typography>Waiting for an opponent...</Typography>
          <Button onClick={() => this.props.deleteHHTriviaGame(game._id)}>
            Cancel Game
          </Button>
        </>
      );
    } else if (curUserFinished) {
      actionButtons = (
        <>
          <Typography>Opponent's turn...</Typography>
        </>
      );
    } else {
      const text = opponentFinished
        ? "Opponent is waiting for you!"
        : "Be the first to start!";
      actionButtons = (
        <>
          <Typography>{text}</Typography>
          <Button
            onClick={() => this.props.startHHTriviaGame(game._id, playerNum)}
            color="primary"
          >
            Start Game
          </Button>
        </>
      );
    }
    return <div className="hhtrivia-action-buttons">{actionButtons}</div>;
  }
  createGamesList() {
    const username = this.props.users[this.props.userId].displayName;
    return this.props.allGames.map((game) => {
      const opponentUserId =
        game.player1.userId === this.props.userId
          ? game.player2.userId
          : game.player1.userId;
      const opponentUsername = this.props.users[opponentUserId]
        ? this.props.users[opponentUserId].displayName
        : "-----";
      const opponentACS = this.props.users[opponentUserId]
        ? acsToAggregate(this.props.users[opponentUserId].acs)
        : "?";
      const playerNum = game.player1.userId === this.props.userId ? 1 : 2;
      return (
        <Accordion
          key={game._id}
          className="hhtrivia-game-list-container"
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div>
              <Typography>
                {username} ({this.props.acsScore}) vs {opponentUsername} (
                {opponentACS})
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionActions>
            {this.createAccordionActions(game, playerNum)}
          </AccordionActions>
        </Accordion>
      );
    });
  }

  render() {
    let hhTriviaPage = null;
    if (this.props.showGame) {
      hhTriviaPage = <>{this.createTriviaQuestion()}</>;
    } else if (
      this.props.fetchAllGamesFinished &&
      this.props.fetchAllUsersFinished
    ) {
      let index = 0;
      this.props.allGames.forEach((game) => {
        if (
          game.player1.startedGame &&
          game.player2.startedGame &&
          !game.evaluated
        ) {
          this.props.evaluateHHTriviaGame(
            this.props.allGames,
            this.props.users,
            index,
            this.props.userId
          );
        }
        index += 1;
      });
      hhTriviaPage = (
        <>
          {this.createGamesList()}
          <div className="sbs-buttons">
            <Button
              variant="contained"
              onClick={() => this.props.createHHTriviaGame(this.props.userId)}
            >
              Create Game
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.joinHHTriviaGame(this.props.userId)}
            >
              Join Game
            </Button>
          </div>
        </>
      );
    } else {
      hhTriviaPage = <CircularProgress />;
    }
    return <div className="hhtrivia-page">{hhTriviaPage}</div>;
  }
}

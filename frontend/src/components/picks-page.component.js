import React, { Component } from "react";
import memoize from "@hs/transmute/memoize";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PicksCard from "./picks-card.component";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./alert.component";
import { dateToISO } from "../utils/dateUtils";

export default class PicksPage extends Component {
  componentDidMount() {
    const {
      userId,
      acsScore,
      getACS,
      getGames,
      getDailyPicksFromDB,
    } = this.props;
    if (!acsScore) {
      getACS(userId);
    }
    getGames();
    getDailyPicksFromDB(userId);
  }

  handleChangedDate = (event) => {
    const formatteddate = event.target.value.replaceAll("-", "/");
    this.props.updateDate(formatteddate);
  };

  submitPicks = () => {
    const { sendDailyPicksToDb, userId, dailyPicks, madePicks } = this.props;
    sendDailyPicksToDb(userId, dailyPicks, madePicks);
  };

  handlePicked = (game, winner, isEvaluated, result) => {
    const pick = {
      [game._id]: {
        winner,
        isEvaluated,
        result,
      },
    };
    this.props.updateDailyPicks(pick);
  };

  getGamesByDate = memoize((date, games) =>
    games.filter((game) => {
      const gameDate = new Date(game.date * 1000);
      return (
        gameDate.getDate() === date.getDate() &&
        gameDate.getMonth() === date.getMonth() &&
        gameDate.getFullYear() === date.getFullYear()
      );
    })
  );

  handleEvaluation = () => {
    const { date, games, dailyPicks, acsScore, userId, updateACS } = this.props;

    const gamesDuringDate = this.getGamesByDate(date, games);

    let correct = 0;
    gamesDuringDate.forEach((game) => {
      const winner = dailyPicks[game._id] && dailyPicks[game._id].winner;
      const actualWinner = game.winner;
      if (winner && winner === actualWinner) {
        correct++;
        this.handlePicked(game, winner, true, true);
      } else {
        this.handlePicked(game, winner, true, false);
      }
    });
    setTimeout(() => this.submitPicks());
    updateACS(userId, "PICKS", acsScore + correct * 10);
  };

  createGames(date) {
    const { games, dailyPicks } = this.props;

    if (!games || games.length === 0) {
      return <div className="game">No Games</div>;
    }
    if (this.getGamesByDate(date, games).length === 0) {
      return <div className="game">No Games</div>;
    }
    return this.getGamesByDate(date, games).map((game) => (
      <PicksCard
        key={game._id}
        gamePick={dailyPicks[game._id]}
        game={game}
        handlePicked={this.handlePicked}
      />
    ));
  }

  createDatePicker() {
    return (
      <div>
        <TextField
          className="game-date"
          label="Game Date"
          type="date"
          defaultValue={dateToISO(this.props.date)}
          onChange={this.handleChangedDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    );
  }

  createAlerts() {
    return (
      <>
        <Snackbar
          open={this.props.showSuccess}
          autoHideDuration={5000}
          onClose={this.props.closeSuccess}
        >
          <Alert severity="success" onClose={this.props.closeSuccess}>
            {this.props.successReason}
          </Alert>
        </Snackbar>
        <Snackbar
          open={this.props.showError}
          autoHideDuration={5000}
          onClose={this.props.closeError}
        >
          <Alert severity="error" onClose={this.props.closeError}>
            {this.props.errorReason}
          </Alert>
        </Snackbar>
      </>
    );
  }

  render() {
    const firstGameOnDate = this.getGamesByDate(
      this.props.date,
      this.props.games
    )[0];
    const isEvaluated =
      firstGameOnDate &&
      this.props.dailyPicks[firstGameOnDate._id] &&
      this.props.dailyPicks[firstGameOnDate._id].isEvaluated;

    return (
      <div className="picks-page">
        <Box
          bgcolor="primary.main"
          color="primary.contrastText"
          className="user-acs"
        >
          {this.props.username}: {this.props.acsScore}
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleEvaluation}
            disabled={isEvaluated}
          >
            EVALUATE
          </Button>
        </Box>

        {this.createDatePicker()}
        {this.createGames(this.props.date)}
        <Button
          variant="contained"
          color="primary"
          onClick={this.submitPicks}
          disabled={isEvaluated}
        >
          SUBMIT
        </Button>
        {this.createAlerts()}
      </div>
    );
  }
}

PicksPage.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  acsScore: PropTypes.number,
  dailyPicks: PropTypes.object,
  date: PropTypes.instanceOf(Date),
  games: PropTypes.array,
  madePicks: PropTypes.bool,
  getACS: PropTypes.func,
  getGames: PropTypes.func,
  updateDate: PropTypes.func,
  sendDailyPicksToDb: PropTypes.func,
  getDailyPicksFromDB: PropTypes.func,
  updateDailyPicks: PropTypes.func,
  updateACS: PropTypes.func,
  showSuccess: PropTypes.bool,
  successReason: PropTypes.string,
  showError: PropTypes.bool,
  errorReason: PropTypes.string,
  closeSuccess: PropTypes.func,
  closeError: PropTypes.func,
};

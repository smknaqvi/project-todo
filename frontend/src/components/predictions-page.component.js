import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { AWARDS } from "../constants";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { LoadingWrapper } from "./loading-wrapper.component";
import Card from "@material-ui/core/Card";

const rookieOTY = "rookieOTY";

class PredictionsPage extends Component {
  componentDidMount() {
    this.props.getPlayers();
    this.props.getACS(this.props.userId);
    this.props.getPicksFromDB(this.props.userId);
    const date = new Date();
    const year = date.getFullYear();
    this.props.getWinnersFromDB(year.toString());
  }

  componentDidUpdate(prevProps) {
    const { fetchWinners, fetchPredictions, fetchPlayers } = this.props;
    if (
      prevProps.fetchWinners !== fetchWinners ||
      prevProps.fetchPredictions !== fetchPredictions ||
      prevProps.fetchPlayers !== fetchPlayers ||
      (this.props.isLoading && fetchPlayers && fetchPredictions && fetchWinners)
    ) {
      this.props.setLoading(
        !(fetchPlayers && fetchPredictions && fetchWinners)
      );
    }
  }

  handleUpdatePicks(key, value) {
    const pick = { [key]: value };
    this.props.updatePicks(pick);
  }

  createAwardElements() {
    return AWARDS.map((award) => {
      return (
        <Card
          className={
            "award " +
            (this.props.isEvaluated
              ? this.props.results[award.key]
                ? "correct"
                : "wrong"
              : "")
          }
          key={award.key}
        >
          <div className="award-title">{award.award}</div>
          <div className="award-dropdown">
            <Autocomplete
              id={award.key}
              disabled={this.props.isEvaluated}
              value={
                this.props.awards[award.key]
                  ? this.props.awards[award.key]
                  : null
              }
              options={
                award.key === rookieOTY
                  ? this.props.rookies
                  : this.props.players
              }
              onChange={(_event, value) => {
                this.handleUpdatePicks(award.key, value);
              }}
              getOptionSelected={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select a Player" />
              )}
            />
          </div>
          <div className="winner-image">{this.createWinnerImage(award)}</div>
        </Card>
      );
    });
  }

  createWinnerImage(award) {
    if (
      this.props.awards[award.key] !== undefined &&
      this.props.awards[award.key] !== null
    ) {
      return <img src={this.props.awards[award.key].picture} alt="player" />;
    }
  }

  submitPicks = () => {
    const allPicks = {
      mvp: null,
      rookieOTY: null,
      defensivePOTY: null,
      MIP: null,
      sixMan: null,
      ...this.props.awards,
    };

    const date = new Date();
    const year = date.getFullYear();
    this.props.sendPicksToDB(
      year,
      this.props.userId,
      allPicks,
      null,
      this.props.madePicks,
      this.props.isEvaluated
    );
  };

  evaluatePicks = () => {
    const { winners, awards } = this.props;
    const results = {
      mvp: null,
      rookieOTY: null,
      defensivePOTY: null,
      MIP: null,
      sixMan: null,
    };
    let correct = 0;
    AWARDS.forEach((award) => {
      let awardkey = award.key;
      if (
        awards[awardkey] === undefined ||
        awards[awardkey] === null ||
        awards[awardkey].name !== winners.get("picks")[awardkey]
      ) {
        results[awardkey] = false;
      } else {
        results[awardkey] = true;
        correct++;
      }
    });
    const date = new Date();
    const year = date.getFullYear();
    this.props.sendPicksToDB(
      year,
      this.props.userId,
      awards,
      results,
      this.props.madePicks,
      true
    );

    this.props.updateACS(
      this.props.userId,
      "PREDICTIONS",
      this.props.pPPScore + correct * 10
    );
  };

  render() {
    const { isLoading } = this.props;
    if (!isLoading) {
      return (
        <div className="predicts-page">
          <Box
            bgcolor="primary.main"
            color="primary.contrastText"
            className="user-acs"
          >
            <Button
              disabled={this.props.isEvaluated}
              variant="contained"
              color="secondary"
              onClick={this.evaluatePicks}
            >
              EVALUATE
            </Button>
          </Box>

          {this.createAwardElements()}
          <Button
            disabled={this.props.isEvaluated}
            variant="contained"
            color="secondary"
            onClick={this.submitPicks}
          >
            SUBMIT
          </Button>
        </div>
      );
    } else {
      return null;
    }
  }
}

PredictionsPage.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  acsScore: PropTypes.number,
  pPPScore: PropTypes.number,
  players: PropTypes.array,
  rookies: PropTypes.array,
  awards: PropTypes.object,
  madePicks: PropTypes.bool,
  results: PropTypes.object,
  winners: PropTypes.object,
  isEvaluated: PropTypes.bool,
  getACS: PropTypes.func,
  getPlayers: PropTypes.func,
  updatePicks: PropTypes.func,
  sendPicksToDB: PropTypes.func,
  getPicksFromDB: PropTypes.func,
  getWinnersFromDB: PropTypes.func,
  updateACS: PropTypes.func,
};

export default LoadingWrapper(PredictionsPage);

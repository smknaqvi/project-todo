import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { dateToISO } from "../utils/dateUtils";
import Card from "@material-ui/core/Card";

export default function PicksCard({ gamePick, game, handlePicked }) {
  const isEvaluated = gamePick && gamePick.isEvaluated;
  const awaySelected = gamePick && gamePick.winner === game.awayName;
  const homeSelected = gamePick && gamePick.winner === game.homeName;
  const gameDate = new Date(game.date * 1000);

  return (
    <Card
      className={
        "game " +
        (gamePick
          ? gamePick.result !== null
            ? gamePick.result
              ? "correct"
              : "wrong"
            : ""
          : "")
      }
      key={game.date}
    >
      <div className="home-away">
        HOME
        <img src={game.homeImage} alt="home" />
        {game.homeName}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handlePicked(game, game.homeName, false, null);
          }}
          disabled={isEvaluated || homeSelected}
        >
          PICK
        </Button>
      </div>
      <div className="game-date">{dateToISO(gameDate)}</div>
      <div className="home-away">
        AWAY
        <img src={game.awayImage} alt="away" />
        {game.awayName}
        <Button
          variant="contained"
          color="primary"
          disabled={isEvaluated || awaySelected}
          onClick={() => {
            handlePicked(game, game.awayName, false, null);
          }}
        >
          PICK
        </Button>
      </div>
    </Card>
  );
}

PicksCard.propTypes = {
  gamePick: PropTypes.object,
  game: PropTypes.object,
  handlePicked: PropTypes.func,
};

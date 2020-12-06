const router = require("express").Router();
const Game = require("../models/games.model");

/**
 * Get all games
 * @route GET /games
 * @group P&P - Operations related to picks and predictions
 * @returns {object} 200 - JSON array of all games
 * @returns {Error}  404 - Error message string
 */
router.route("/").get((_, res) => {
  Game.find()
    .then((games) => res.status(200).json(games))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

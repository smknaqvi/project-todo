const router = require("express").Router();
const Game = require("../models/games.model");

router.route("/").get((_, res) => {
  Game.find()
    .then((games) => res.status(200).json(games))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

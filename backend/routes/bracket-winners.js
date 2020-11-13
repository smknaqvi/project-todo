const router = require("express").Router();
let bracketWinners = require("../models/bracket-winners.model");

router.route("/:matchNumber").get((req, res) => {
  bracketWinners
    .findOne({ matchNumber: req.params.matchNumber })
    .then((results) => {
      if (results === null) {
        res
          .status(404)
          .json(
            "No bracket winners have been found for match number: " +
              req.params.matchNumber
          );
      } else {
        res.status(200).json(results);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

router.route("/").get((_, res) => {
  bracketWinners
    .find()
    .then((winners) => res.status(200).json(winners))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

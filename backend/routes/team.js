const router = require("express").Router();
let Teams = require("../models/team.model");

/**
 * Get a team given that team's id
 * @route GET /team/{id}
 * @group P&P - Operations related to picks and predictions
 * @param {string} id.path.required - id of team to get
 * @returns {object} 200 - JSON object of the team
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Team with this id not found!"
 */
router.route("/:id").get((req, res) => {
  Teams.findById(req.params.id)
    .then((team) => {
      if (team === null) {
        res.status(404).json("Team with this id not found!");
      } else {
        res.status(200).json(team);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Get all teams
 * @route GET /team
 * @group P&P - Operations related to picks and predictions
 * @returns {object} 200 - JSON array of all teams
 * @returns {Error}  400 - Error message string
 */
router.route("/").get((_, res) => {
  Teams.find()
    .then((team) => res.status(200).json(team))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

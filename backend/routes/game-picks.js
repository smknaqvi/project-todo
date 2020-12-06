const router = require("express").Router();
const GamePick = require("../models/game-picks.model");

/**
 * Get a game pick given the game pick id
 * @route GET /game-picks/{id}
 * @group P&P - Operations related to picks and predictions
 * @param {string} id.path.required - id of game pick to get
 * @returns {object} 200 - JSON object of game pick
 * @returns {Error}  404 - Error message "Error: GamePick Not Found!"
 */
router.route("/:id").get((req, res) => {
  GamePick.findOne({ user: req.params.id })
    .then((pick) => res.status(200).json(pick))
    .catch((error) => res.status(404).json("Error: GamePick Not Found!"));
});

/**
 * @typedef GamePicksBody
 * @property {string} user.required - userId of user that created game pick
 * @property {object} picks.required - game-picks of user
 */

/**
 * Create a new game-picks object
 * @route POST /game-picks
 * @group P&P - Operations related to picks and predictions
 * @param {GamePicksBody.model} body.body.required - GamePicksBody
 * @returns {object} 200 - JSON object of newly created game-picks object
 * @returns {Error}  400 - Error message "Error: GamePick Already Exists!"
 */
router.route("/").post((req, res) => {
  const user = req.body.user;
  const picks = req.body.picks;
  const newGamePick = new GamePick({
    user: user,
    picks: picks,
  });

  newGamePick
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json("Error: GamePick Already Exists!"));
});

/**
 * Updates a game-pick object
 * @route PUT /game-picks/{id}
 * @group P&P - Operations related to picks and predictions
 * @param {string} id.path.required - id of game-pick to update
 * @param {GamePicksBody.model} body.body.required - GamePicksBody
 * @returns {object} 200 - JSON object of updated game-picks object
 * @returns {Error}  400 - Error message "Error: could not find GamePick!"
 */
router.route("/:id").put((req, res) => {
  GamePick.findOneAndUpdate(
    { user: req.params.id },
    {
      user: req.params.id,
      picks: req.body.picks,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((updatedGamePick) => {
      if (updatedGamePick === null) {
        res.status(404).json("Error: could not find GamePick!");
      } else {
        res.status(200).json(updatedGamePick);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

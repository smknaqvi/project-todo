const router = require("express").Router();
let UserPick = require("../models/user-picks.model");

router.route("/:id").get((req, res) => {
  UserPick.findOne({ user: req.params.id })
    .then((picks) => res.status(200).json(picks))
    .catch(() => res.status(404).json("Error: UserPick Not Found!"));
});

/**
 * @typedef UserPicksBody
 * @property {string} user.required - userId of user that created pick
 * @property {object} picks.required - picks object
 * @property {string} year.required - UTC formatted date pick was created
 * @property {object} results.required - results object
 * @property {boolean} isEvaluated.required - boolean indicating if pick has been evaluated yet
 */

/**
 * Create a new user pick object
 * @route POST /user-picks
 * @group P&P - Operations related to picks and predictions
 * @param {UserPicksBody.model} body.body.required - UserPicksBody
 * @returns {object} 200 - JSON object of newly created pick
 * @returns {Error}  400 - Error message "Error: UserPick Already Exists!"
 */
router.route("/").post((req, res) => {
  const user = req.body.user;
  const picks = req.body.picks;
  const year = req.body.year;
  const results = req.body.results;
  const isEvaluated = req.body.isEvaluated;
  const newUserPick = new UserPick({
    year: year,
    user: user,
    picks: picks,
    results: results,
    isEvaluated: isEvaluated,
  });

  newUserPick
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json("Error: UserPick Already Exists!"));
});

/**
 * Update a user pick object given that pick's id
 * @route PUT /user-picks/{id}
 * @group P&P - Operations related to picks and predictions
 * @param {string} id.path.required - id of pick to update
 * @param {UserPicksBody.model} body.body.required - UserPicksBody
 * @returns {object} 200 - JSON object of newly updated pick
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Error: could not find userpick!"
 */
router.route("/:id").put((req, res) => {
  UserPick.findOneAndUpdate(
    { user: req.params.id },
    {
      year: req.body.year,
      user: req.params.id,
      picks: req.body.picks,
      results: req.body.results,
      isEvaluated: req.body.isEvaluated,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((updatedUserPick) => {
      if (updatedUserPick === null) {
        res.status(404).json("Error: could not find userpick!");
      } else {
        res.status(200).json(updatedUserPick);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

const router = require("express").Router();
const { Bracket, BracketChoice } = require("../models/bracket.model");

/**
 * Get brackets for current year
 * @route GET /bracket/{year}
 * @group Brackets - Operations related to Brackets
 * @param {string} year.path.required - Year to retrieve bracket information for
 * @returns {object} 200 - JSON object of bracket info for year
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Error: No brackets found for this year!"
 */
router.route("/:year").get((req, res) => {
  const year = req.params.year;
  Bracket.find({ year: year })
    .sort({ matchNumber: 1 })
    .then((brackets) => {
      if (brackets.length === 0) {
        return res.status(404).json("Error: No brackets found for this year!");
      } else {
        return res.status(200).json(brackets);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Get bracket chocies for a user given userId
 * @route GET /bracket/bracketChoice/userId/{id}
 * @group Brackets - Operations related to Brackets
 * @param {string} id.path.required - userId of user to retrieve bracket information for
 * @returns {object} 200 - JSON object of bracket choices for user
 * @returns {Error}  400 - Error message string
 */
router.route("/bracketChoice/userId/:id").get((req, res) => {
  const userId = req.params.id;
  BracketChoice.find({ userId: userId })
    .then((brackets) => res.status(200).json(brackets))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @typedef BracketChoiceBody
 * @property {string} teamOne.required - First team in bracket
 * @property {string} teamTwo.required - Second team in bracket
 * @property {string} winnerChoice.required - Winner of bracket
 * @property {string} userId.required - userId of user that owns bracket
 * @property {boolean} isFirstMatch.required - boolean indicating if match is outermost bracket
 * @property {number} teamOneScore.required - Score prediction of first team
 * @property {number} teamTwoScore.required - Score prediction of second team
 * @property {boolean} isEvaluated.required - boolean indicating if prediction has been evaluated
 * @property {boolean} isWinnerCorrect.required - boolean indicating if winner was chosen correctly
 * @property {number} matchNumber.required - Match number (order)
 */

/**
 * Create a bracket choice object for a user
 * @route POST /bracket/bracketChoice
 * @group Brackets - Operations related to Brackets
 * @param {BracketChoiceBody.model} body.body.required - Bracket choice body
 * @returns {object} 200 - JSON object of newly created bracket
 * @returns {Error}  400 - Error message "Error: Bracket Choice Already Exists!"
 */
router.route("/bracketChoice").post((req, res) => {
  const teamOne = req.body.teamOne || "";
  const teamTwo = req.body.teamTwo || "";
  const winnerChoice = req.body.winnerChoice || "";
  const userId = req.body.userId || "";
  const isFirstMatch = req.body.isFirstMatch || false;
  const teamOneScore = req.body.teamOneScore || 0;
  const teamTwoScore = req.body.teamTwoScore || 0;
  const isEvaluated = req.body.isEvaluated || false;
  const isWinnerCorrect = req.body.isWinnerCorrect || false;
  const matchNumber = req.body.matchNumber || 1;

  const newBracketChoice = new BracketChoice({
    teamOne,
    teamTwo,
    winnerChoice,
    userId,
    isFirstMatch,
    teamOneScore,
    teamTwoScore,
    isEvaluated,
    isWinnerCorrect,
    matchNumber,
  });

  newBracketChoice
    .save()
    .then((bracketChoice) => res.status(200).json(bracketChoice))
    .catch(() => res.status(400).json("Error: Bracket Choice Already Exists!"));
});

/**
 * Update a bracket choice object for a user
 * @route POST /bracket/bracketChoice/{id}
 * @group Brackets - Operations related to Brackets
 * @param {string} id.path.required - userId of user to update bracket choice for
 * @param {BracketChoiceBody.model} body.body.required - Bracket choice body
 * @returns {object} 200 - JSON object of newly created bracket
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Error: could not find bracket choice!"
 */
router.route("/bracketChoice/:id").put((req, res) => {
  const id = req.params.id;
  const teamOne = req.body.teamOne || "";
  const teamTwo = req.body.teamTwo || "";
  const winnerChoice = req.body.winnerChoice || "";
  const userId = req.body.userId || "";
  const isFirstMatch = req.body.isFirstMatch || false;
  const teamOneScore = req.body.teamOneScore || 0;
  const teamTwoScore = req.body.teamTwoScore || 0;
  const isEvaluated = req.body.isEvaluated || false;
  const isWinnerCorrect = req.body.isWinnerCorrect || false;
  const matchNumber = req.body.matchNumber || 1;

  BracketChoice.findOneAndUpdate(
    { _id: id },
    {
      teamOne: teamOne,
      teamTwo: teamTwo,
      winnerChoice: winnerChoice,
      userID: userId,
      isFirstMatch: isFirstMatch,
      teamOneScore: teamOneScore,
      teamTwoScore: teamTwoScore,
      isEvaluated: isEvaluated,
      isWinnerCorrect: isWinnerCorrect,
      matchNumber: matchNumber,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((updatedUserPick) => {
      if (updatedUserPick === null) {
        res.status(404).json("Error: could not find bracket choice!");
      } else {
        res.status(200).json(updatedUserPick);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

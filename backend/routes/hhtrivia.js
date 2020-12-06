const router = require("express").Router();
const { response } = require("express");
const HHTriviaGame = require("../models/hh-trivia-game.model");
const TriviaQuestion = require("../models/trivia-question.model");

/**
 * Update an HHTrivia game as started for a given player
 * @route PUT /hhtrivia/{id}/start/{player}
 * @group Trivia - Operations related to Trivia
 * @param {string} id.path.required - id of head to head trivia game
 * @param {number} player.path.required - 1 or 2 representing the player that started the game
 * @returns {object} 200 - JSON object of updated hhtrivia game
 * @returns {Error}  404 - Error message "Head to Head Trivia game not found!"
 */
router.route("/:id/start/:player").put((req, res) => {
  const updateVal =
    req.params.player === "1"
      ? { $set: { "player1.startedGame": true } }
      : { $set: { "player2.startedGame": true } };

  HHTriviaGame.findOneAndUpdate(
    { _id: req.params.id },
    updateVal,
    { new: true, useFindAndModify: false },
    (err, game) => {
      if (game === null) {
        res.status(404).json("Head to Head Trivia game not found!");
      } else {
        res.status(200).json(game);
      }
    }
  );
});

/**
 * @typedef ACSChangeBody
 * @property {number} acsChange.required - amount of acsChange
 */

/**
 * Update an HHTrivia game with acsChange for a player2
 * @route PUT /hhtrivia/{id}/acsChange/{player}
 * @group Trivia - Operations related to Trivia
 * @param {string} id.path.required - id of head to head trivia game
 * @param {number} player.path.required - 1 or 2 representing the player to update acsChange for
 * @param {ACSChangeBody.model} body.body.required - ACSChangeBody
 * @returns {object} 200 - JSON object of updated hhtrivia game
 * @returns {Error}  404 - Error message "Head to Head Trivia game not found!"
 */
router.route("/:id/acsChange/:player").put((req, res) => {
  const updateVal =
    req.params.player === "1"
      ? { $set: { "player1.acsChange": req.body.acsChange } }
      : { $set: { "player2.acsChange": req.body.acsChange } };

  HHTriviaGame.findOneAndUpdate(
    { _id: req.params.id },
    updateVal,
    { new: true, useFindAndModify: false },
    (err, game) => {
      if (game === null) {
        res.status(404).json("Head to Head Trivia game not found!");
      } else {
        res.status(200).json(game);
      }
    }
  );
});

/**
 * Set an HHTrivia game to evaluated
 * @route PUT /hhtrivia/{id}/evaluate
 * @group Trivia - Operations related to Trivia
 * @param {string} id.path.required - id of head to head trivia game
 * @returns {object} 200 - JSON object of updated hhtrivia game
 * @returns {Error}  404 - Error message "Head to Head Trivia game not found!"
 */
router.route("/:id/evaluate").put((req, res) => {
  HHTriviaGame.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { evaluated: true } },
    { new: true, useFindAndModify: false },
    (err, game) => {
      if (game === null) {
        res.status(404).json("Head to Head Trivia game not found!");
      } else {
        res.status(200).json(game);
      }
    }
  );
});

/**
 * Update an HHTrivia game to increment a player's correct answer count
 * @route PUT /hhtrivia/{id}/increment-correct/{player}
 * @group Trivia - Operations related to Trivia
 * @param {string} id.path.required - id of head to head trivia game
 * @param {number} player.path.required - 1 or 2 representing the player that correctly answered another question
 * @returns {object} 200 - JSON object of updated hhtrivia game
 * @returns {Error}  404 - Error message "Head to Head Trivia game not found!"
 */
router.route("/:id/increment-correct/:player").put((req, res) => {
  const updateVal =
    req.params.player === "1"
      ? { $inc: { "player1.numCorrect": 1 } }
      : { $inc: { "player2.numCorrect": 1 } };

  HHTriviaGame.findOneAndUpdate(
    { _id: req.params.id },
    updateVal,
    { new: true, useFindAndModify: false },
    (err, game) => {
      if (game === null) {
        res.status(404).json("Head to Head Trivia game not found!");
      } else {
        res.status(200).json(game);
      }
    }
  );
});

/**
 * @typedef CreateHHTriviaGameBody
 * @property {string} userId.required - userId of user that created the game
 */

/**
 * Create a new HHTrivia game
 * @route POST /hhtrivia/create-game
 * @group Trivia - Operations related to Trivia
 * @param {CreateHHTriviaGameBody.model} body.body.required - CreateHHTriviaGameBody
 * @returns {object} 200 - JSON object of newly created game
 * @returns {Error}  400 - Error message string
 */
router.route("/create-game").post((req, res) => {
  const userId = req.body.userId;
  const numQuestions = 3;
  TriviaQuestion.aggregate([{ $sample: { size: numQuestions } }]).then(
    (triviaQuestions) => {
      const Game = new HHTriviaGame({
        questions: triviaQuestions,
        player1: {
          userId: userId,
        },
        player2: {
          userId: null,
        },
      });
      Game.save()
        .then((game) => res.status(200).json(game))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  );
});

/**
 * @typedef JoinHHTriviaGameBody
 * @property {string} userId.required - userId of user that created the game
 */

/**
 * Join an HHTrivia Game
 * @route PUT /hhtrivia/join-game
 * @group Trivia - Operations related to Trivia
 * @param {JoinHHTriviaGameBody.model} body.body.required - JoinHHTriviaGameBody
 * @returns {object} 200 - JSON object of game user has joined
 * @returns {Error}  404 - Error message "Could not find Head to Head Trivia game!"
 */
router.route("/join-game").put((req, res) => {
  const userId = req.body.userId;
  HHTriviaGame.findOneAndUpdate(
    {
      "player2.userId": null,
      "player1.userId": { $ne: userId },
    },
    { $set: { "player2.userId": userId } },
    { new: true, useFindAndModify: false },
    (err, game) => {
      if (game === null) {
        res.status(404).json("Could not find Head to Head Trivia game!");
      } else {
        res.status(200).json(game);
      }
    }
  );
});

/**
 * Delete an HHTrivia Game
 * @route DELETE /hhtrivia/{id}
 * @group Trivia - Operations related to Trivia
 * @param {string} id.path.required - id of HHTrivia Game to delete
 * @returns {object} 200 - JSON object of game that was deleted
 * @returns {Error}  404 - Error message "Could not find Head to Head Trivia game!"
 * @returns {Error}  400 - Error message string
 */
router.route("/:id").delete((req, res) => {
  HHTriviaGame.findOneAndDelete({ _id: req.params.id })
    .then((game) => {
      if (game === null) {
        res.status(404).json("Could not find Head to Head Trivia game!");
      } else {
        res.status(200).json(game);
      }
    })
    .catch((err) => res.status(400).json("Error" + err));
});

/**
 * Get all HHTrivia Games for a user given a userId
 * @route GET /hhtrivia/user-games/{id}
 * @group Trivia - Operations related to Trivia
 * @param {string} id.path.required - id of user to get games for
 * @returns {object} 200 - JSON array of HHTrivia Games a user is participating in
 * @returns {Error}  400 - Error message string
 */
router.route("/user-games/:id").get((req, res) => {
  HHTriviaGame.find()
    .or([
      { "player1.userId": req.params.id },
      { "player2.userId": req.params.id },
    ])
    .then((game) => {
      res.status(200).json(game);
    })
    .catch((error) => {
      res.status(400).json("Error: " + error);
    });
});

/**
 * Get an HHTrivia Game given the game's id
 * @route GET /hhtrivia/{id}
 * @group Trivia - Operations related to Trivia
 * @param {string} id.path.required - id of HHTrivia Game to get
 * @returns {object} 200 - JSON object of HHTrivia Game
 * @returns {Error}  404 - Error message "Could not find game with given ID"
 */
router.route("/:id").get((req, res) => {
  HHTriviaGame.findById(req.params.id)
    .then((game) => {
      if (game) {
        res.status(200).json(game);
      } else {
        res.status(404).json("Could not find game with given ID");
      }
    })
    .catch((error) =>
      res.status(404).json("Error: Head to Head Trivia game not found!")
    );
});

module.exports = router;

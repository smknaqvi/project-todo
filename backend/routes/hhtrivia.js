const router = require("express").Router();
const { response } = require("express");
const HHTriviaGame = require("../models/hh-trivia-game.model");
const TriviaQuestion = require("../models/trivia-question.model");

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

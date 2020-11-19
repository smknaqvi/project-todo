const router = require("express").Router();
const { Bracket, BracketChoice } = require("../models/bracket.model");

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

router.route("/bracketChoice/userId/:id").get((req, res) => {
  const userId = req.params.id;
  BracketChoice.find({ userId: userId })
    .then((brackets) => res.status(200).json(brackets))
    .catch((err) => res.status(400).json("Error: " + err));
});

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

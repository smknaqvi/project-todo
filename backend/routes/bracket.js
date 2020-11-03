const router = require("express").Router();
const { Bracket, BracketChoice } = require("../models/bracket.model");
const { Team } = require("../models/team.model");

router.route("/").get((_, res) => {
  Bracket.find()
    .then((brackets) => res.status(200).json(brackets))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/teams").post((req, res) => {
  const name = req.body.name;
  const picture = req.body.picture || " ";
  const players = req.body.players || [];
  const newTeam = new Team({
    name,
    picture,
    players,
  });

  newTeam
    .save()
    .then((team) => res.status(200).json(team))
    .catch((err) => res.status(400).json("Error: Team Already Exists! "));
});

router.route("/").post((req, res) => {
  const bracket = req.body.bracket || [];
  const newBracket = new Bracket({
    bracket,
  });

  newBracket
    .save()
    .then((bracket) => res.status(200).json(bracket))
    .catch((err) =>
      res.status(400).json("Error: Bracket Already Exists! " + err)
    );
});

router.route("/:id/team/:tid").post((req, res) => {
  const bracketId = req.params.id;
  const teamId = req.params.tid;

  const newTeam = Team();

  Team.find({ _id: teamId }, (err, team) => {
    Bracket.findOneAndUpdate(
      { _id: bracketId },
      { $push: { teams: team } },
      { useFindAndModify: false, new: true, runValidators: true }
    )
      .then((updatedTeams) => {
        if (updatedTeams === null) {
          res.status(404).json("Error: could not add team");
        } else {
          res.status(200).json(updatedTeams);
        }
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route("/bracketChoice/:id").get((req, res) => {
  const bracketChoiceId = req.params.id;

  BracketChoice.find({ _id: bracketChoiceId })
    .then((brackets) => res.status(200).json(brackets))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/bracketChoice").post((req, res) => {
  const teamOne = req.body.teamOne || "";
  const teamTwo = req.body.teamTwo || "";
  const winnerID = req.body.winnerID || "";
  const resultForWinner = req.body.resultForWinner || "";
  const userID = req.body.userID || "";
  const isFirstMatch = req.body.isFirstMatch || false;
  const winnerScore = req.body.winnerScore || 0;
  const loserScore = req.body.loserScore || 0;

  const newBracketChoice = new BracketChoice({
    teamOne,
    teamTwo,
    winnerID,
    resultForWinner,
    userID,
    isFirstMatch,
    winnerScore,
    loserScore,
  });

  newBracketChoice
    .save()
    .then((bracketChoice) => res.status(200).json(bracketChoice))
    .catch((err) =>
      res.status(400).json("Error: Bracket Choice Already Exists! ")
    );
});

router.route("/bracketChoice/:id").put((req, res) => {
  BracketChoice.findOneAndUpdate(
    { _id: req.params.id },
    {
      teamOne: req.body.teamOne || "",
      teamTwo: req.body.teamTwo || "",
      winnerID: req.body.winnerID || "",
      userID: req.body.userID || "",
      resultForWinner: req.body.resultForWinner || "",
      isFirstMatch: req.body.isFirstMatch || false,
      winnerScore: req.body.winnerScore || 0,
      loserScore: req.body.loserScore || 0,
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
    .catch((err) => res.status(400).json("Error"));
});

router.route("/bracketChoice/:id").delete((req, res) => {
  const bracketChoiceId = req.params.id;
  BracketChoice.findByIdAndDelete({ _id: bracketChoiceId })
    .then((deleteTeam) => {
      if (deleteTeam === null) {
        res.status(404).json("Error: could not find teams");
      } else {
        res.status(200).json(deleteTeam);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/bracketChoice/userID/:id").get((req, res) => {
  const userID = req.params.id;

  BracketChoice.find({ userID: userID })
    .then((brackets) => res.status(200).json(brackets))
    .catch((err) => res.status(400).json("Error: "));
});

module.exports = router;

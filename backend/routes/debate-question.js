const router = require("express").Router();
const DebateQuestion = require("../models/debate-question.model");

router.route("/").get((req, res) => {
  DebateQuestion.find()
    .then((debateQuestions) => res.status(200).json(debateQuestions))
    .catch((error) =>
      res.status(404).json("Error: No Debate Questions Found!")
    );
});

router.route("/get-by-tier/:tier").get((req, res) => {
  DebateQuestion.find({
    tier: req.params.tier,
  })
    .then((debateQuestions) => res.status(200).json(debateQuestions))
    .catch((error) =>
      res.status(404).json("Error: No Debate Questions Found!")
    );
});

module.exports = router;

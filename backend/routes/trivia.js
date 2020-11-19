const router = require("express").Router();
const TriviaQuestion = require("../models/trivia-question.model");
const User = require("../models/user.model");

router.route("/questions").get((req, res) => {
  TriviaQuestion.find()
    .then((questions) => {
      if (questions === null) {
        res.status(404).json("No questions have been found!");
      } else {
        res.status(200).json(questions);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).json("User with this id not found!");
      } else {
        res.status(200).json(user.triviaQuestionsCompleted);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/").put((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((updatedUser) => {
      if (updatedUser === null) {
        res.status(404).json("Error: could not find user");
      } else {
        res.status(200).json(updatedUser);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const question = req.body.question;
  const responses = req.body.answers;
  const newQuestion = new TriviaQuestion({
    question: question,
    responses: responses,
  });

  newQuestion.save().then((user) => res.status(200).json(user));
});

module.exports = router;

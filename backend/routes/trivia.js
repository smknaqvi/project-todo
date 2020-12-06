const router = require("express").Router();
const TriviaQuestion = require("../models/trivia-question.model");
const User = require("../models/user.model");

/**
 * Get all trivia questions
 * @route GET /trivia/questions
 * @group Trivia - Operations related to Trivia
 * @returns {object} 200 - JSON array of all trivia questions
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "No questions have been found!"
 */
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

/**
 * Get trivia questions completed by a user
 * @route GET /trivia/{id}
 * @group Trivia - Operations related to Trivia
 * @param {string} id.path.required - id of user to get number of questions completed
 * @returns {number} 200 - number of trivia questions the user has completed
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message User with this id not found!"
 */
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

/**
 * @typedef TriviaQuestionBody
 * @property {string} question.required - trivia question
 * @property {object} responses.required - response object of responses
 */

/**
 * Create a new comment on a post
 * @route POST /trivia
 * @group Trivia - Operations related to Trivia
 * @param {TriviaQuestionBody.model} body.body.required - TriviaQuestionBody
 * @returns {object} 200 - JSON object of updated post
 * @returns {Error}  400 - Error message string
 */
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

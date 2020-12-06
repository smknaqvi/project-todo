const router = require("express").Router();
const DebateQuestion = require("../models/debate-question.model");

/**
 * Get all debate questions
 * @route GET /debate-questions
 * @group Debates - Operations related to Debates
 * @returns {object} 200 - JSON array of debate questions
 * @returns {Error}  404 - Error message "Error: No Debate Questions Found!"
 */
router.route("/").get((req, res) => {
  DebateQuestion.find()
    .then((debateQuestions) => res.status(200).json(debateQuestions))
    .catch((error) =>
      res.status(404).json("Error: No Debate Questions Found!")
    );
});

/**
 * Get all debate questions for a given tier
 * @route GET /debate-questions/get-by-tier/{tier}
 * @group Debates - Operations related to Debates
 * @param {string} tier.path.required - Tier to retrieve debate questions for - e.g. "Fanalyst"
 * @returns {object} 200 - JSON array of debate questions
 * @returns {Error}  404 - Error message "Error: No Debate Questions Found!"
 */
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

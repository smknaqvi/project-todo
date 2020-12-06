const router = require("express").Router();
const Debate = require("../models/debate.model");

/**
 * Get a debate given that debate's id
 * @route GET /debate/{id}
 * @group Debates - Operations related to Debates
 * @param {string} id.path.required - id of debate response to update
 * @returns {object} 200 - JSON object of debate
 * @returns {Error}  404 - Error message "Error: Debate Not Found!"
 */
router.route("/:id").get((req, res) => {
  Debate.findById(req.params.id)
    .then((debate) => res.status(200).json(debate))
    .catch((error) => res.status(404).json("Error: Debate Not Found!"));
});

/**
 * Get all debates created on a date given that date
 * @route GET /debate/get-by-date/{date}
 * @group Debates - Operations related to Debates
 * @param {string} date.path.required - UTC formatted date for date to grab debates for
 * @returns {object} 200 - JSON array of debate objects created on given date
 * @returns {Error}  404 - Error message "Error: No Debates Found"
 */
router.route("/get-by-date/:date").get((req, res) => {
  const date = new Date(req.params.date * 1000);
  Debate.find({
    date: date,
  })
    .then((debate) => {
      const usersDebate = debate.filter((debate) => {
        return debate.debaters.includes(req.body.userid);
      });
      res.status(200).json(usersDebate);
    })
    .catch((error) => res.status(404).json("Error: No Debates Found"));
});

/**
 * Get all debates a user participates in given userId
 * @route GET /debate/get-by-userid/{userid}
 * @group Debates - Operations related to Debates
 * @param {string} userid.path.required - userId of user to find debates participated in
 * @returns {object} 200 - JSON array of debate objects created on given date
 * @returns {Error}  404 - Error message string
 */
router.route("/get-by-userid/:userid").get((req, res) => {
  Debate.find()
    .then((debate) => {
      const usersDebate = debate.filter((debate) => {
        return debate.debaterIds.includes(req.params.userid);
      });
      res.status(200).json(usersDebate);
    })
    .catch((error) => res.status(404).json(error));
});

/**
 * Get all debates
 * @route GET /debate
 * @group Debates - Operations related to Debates
 * @returns {object} 200 - JSON array of all debate objects
 * @returns {Error}  404 - Error message "Error: No Debates Found!"
 */
router.route("/").get((req, res) => {
  Debate.find()
    .then((debates) => res.status(200).json(debates))
    .catch((error) => res.status(404).json("Error: No Debates Found!"));
});

/**
 * @typedef DebateBody
 * @property {string} tier.required - userId of user rating response
 * @property {string} question.required - value of user's rating
 * @property {Array} debaters - value of user's rating
 * @property {Array} responses - userId of user rating response
 * @property {string} date - userId of user rating response
 */

/**
 * Create a new debate object
 * @route POST /debate
 * @group Debates - Operations related to Debates
 * @param {DebateBody.model} body.body.required - DebateBody
 * @returns {object} 200 - JSON object of newly created debate object
 * @returns {Error}  400 - Error message string
 */
router.route("/").post((req, res) => {
  const tier = req.body.tier;
  const debaters = req.body.debaterIds || [];
  const responses = req.body.responseIds || [];
  const question = req.body.question;
  const date = req.body.date ? new Date(req.body.date) : new Date();
  const isEvaluated = false;
  const newDebate = new Debate({
    tier: tier,
    debaterIds: debaters,
    responseIds: responses,
    question: question,
    date: date,
    isEvaluated: isEvaluated,
  });

  newDebate
    .save()
    .then((debate) => res.status(200).json(debate))
    .catch((err) => res.status(400).json(err));
});

/**
 * Update a debate object given debate id
 * @route PUT /debate/{id}
 * @group Debates - Operations related to Debates
 * @param {string} id.path.required - id of debate object to update
 * @param {DebateBody.model} body.body.required - DebateBody
 * @returns {object} 200 - JSON object of updated debate object
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Error: could not find Debate!"
 */
router.route("/:id").put((req, res) => {
  Debate.findByIdAndUpdate(
    req.params.id,
    {
      tier: req.body.tier,
      debaterIds: req.body.debaterIds || [],
      responseIds: req.body.responseIds || [],
      question: req.body.question,
      date: req.body.date ? new Date(req.body.date) : new Date(),
      isEvaluated: req.body.isEvaluated || false,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((updatedDebate) => {
      if (updatedDebate === null) {
        res.status(404).json("Error: could not find Debate!");
      } else {
        res.status(200).json(updatedDebate);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Get all debates for a given tier
 * @route PUT /debate/get-by-tier/{tier}
 * @group Debates - Operations related to Debates
 * @param {string} tier.path.required - tier for which to return debates
 * @returns {object} 200 - JSON array of debate objects
 * @returns {Error}  404 - Error message "Error:  No Debates Found"
 */
router.route("/get-by-tier/:tier").get((req, res) => {
  Debate.find({
    tier: req.params.tier,
  })
    .then((debate) => {
      res.status(200).json(debate);
    })
    .catch((error) => res.status(404).json("Error: No Debates Found"));
});

module.exports = router;

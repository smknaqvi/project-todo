const router = require("express").Router();
const DebateResponse = require("../models/response.model");
const User = require("../models/user.model");

/**
 * Get all debate responses
 * @route GET /debate-responses
 * @group Debates - Operations related to Debates
 * @returns {object} 200 - JSON array of debate responses
 * @returns {Error}  404 - Error message "Error: No Debates Responses Found"
 */
router.route("/").get((req, res) => {
  DebateResponse.find()
    .then((debateQuestion) => res.status(200).json(debateQuestion))
    .catch((error) =>
      res.status(404).json("Error: No Debates Responses Found")
    );
});

/**
 * Get debate responses given a list of responseids
 * @route GET /debate-responses/get-from-list-of-ids
 * @group Debates - Operations related to Debates
 * @param {Array} responseids.query.required - Array of responseids of responses to get
 * @returns {object} 200 - JSON array of debate responses
 * @returns {Error}  404 - Error message "Resposne with this id not found!"
 * @returns {Error}  400 - Error message string
 */
router.route("/get-from-list-of-ids").get((req, res) => {
  DebateResponse.find({ _id: { $in: req.query.responseids } })
    .then((response) => {
      if (response === null) {
        res.status(404).json("Response with this id not found!");
      } else {
        res.status(200).json(response);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Get debate responses assigned to a user for rating, given user's userId
 * @route GET /debate-responses/get-assigned-responses/{id}
 * @group Debates - Operations related to Debates
 * @param {string} id.path.required - userId of user for which to get assigned responses
 * @returns {object} 200 - JSON array of assigned debate responses
 * @returns {Error}  400 - Error message string
 */
router.route("/get-assigned-responses/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json({ assignedResponses: user.assignedResponses });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Get debate responses given debate response's id
 * @route GET /debate-responses/{id}
 * @group Debates - Operations related to Debates
 * @param {string} id.path.required - id of debate response to get
 * @returns {object} 200 - JSON object of debate response
 * @returns {Error}  404 - Error message "Response with this id not found!"
 * @returns {Error}  400 - Error message string
 */
router.route("/:id").get((req, res) => {
  DebateResponse.findById(req.params.id)
    .then((response) => {
      if (response === null) {
        res.status(404).json("Response with this id not found!");
      } else {
        res.status(200).json(response);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @typedef RatingsBody
 * @property {number} USERID.required - Key-Value pair of userId to rating - e.g. "1321412412": 80
 */

/**
 * @typedef DebateResponseBody
 * @property {string} user.required - userId of creator of debate response
 * @property {string} content.required - Content of debate response
 * @property {number} count.required - Number of users this response has been assigned to for rating
 * @property {RatingsBody.model} ratings - Ratings given to debate response
 * @property {string} date - date debate response was created
 */

/**
 * Create a  debate response
 * @route POST /debate-responses
 * @group Debates - Operations related to Debates
 * @param {DebateResponseBody.model} body.body.required - Debate response body
 * @returns {object} 200 - userId of user who created response
 * @returns {Error}  400 - Error message "Error: Response Already Exists!"
 */
router.route("/").post((req, res) => {
  const user = req.body.user;
  const content = req.body.content;
  const count = req.body.count;
  const ratings = req.body.ratings || new Map();
  const date = req.body.date ? new Date(req.body.date) : new Date();
  const response = new DebateResponse({
    user: user,
    content: content,
    count: count,
    ratings: ratings,
    date: date,
  });

  response
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json("Error: Response Already Exists!"));
});

/**
 * @typedef UpdateCountBody
 * @property {number} count.required - Value of count to update assigned users count to
 */

/**
 * Update the assigned count for a debate response given that response's id
 * @route PUT /debate-responses/update-count/{id}
 * @group Debates - Operations related to Debates
 * @param {string} id.path.required - id of debate response to update
 * @param {UpdateCountBody.model} body.body.required - UpdateCountBody
 * @returns {object} 200 - JSON object of updated response
 * @returns {Error}  400 - Error message "Error: Response Does Not Exist!"
 */
router.route("/update-count/:id").put((req, res) => {
  const count = req.body.count;
  DebateResponse.findByIdAndUpdate(
    req.params.id,
    { count: count },
    { useFindAndModify: false, new: true }
  )
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json("Error: Response Does Not Exist!"));
});

/**
 * @typedef PutAssignedResponsesBody
 * @property {string} response.required - id of response to assign a user
 */

/**
 * Insert response into a user's assigned responses to rate
 * @route PUT /debate-responses/put-assigned-responses/{id}
 * @group Debates - Operations related to Debates
 * @param {string} id.path.required - id of user to insert reponse for
 * @param {PutAssignedResponsesBody.model} body.body.required - PutAssignedResponsesBody
 * @returns {object} 200 - JSON object of inserted response
 * @returns {Error}  400 - Error message "Error: Response Does Not Exist!"
 */
router.route("/put-assigned-responses/:id").put((req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $push: { assignedResponses: req.body.response } },
    { useFindAndModify: false, new: true }
  )
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json("Error: Response Does Not Exist!"));
});

/**
 * @typedef PutRatingBody
 * @property {string} userId.required - userId of user rating response
 * @property {number} value.required - value of user's rating
 */

/**
 * Update a user's rating on a response
 * @route PUT /debate-responses/put-rating/{id}
 * @group Debates - Operations related to Debates
 * @param {string} id.path.required - id of debate response to update
 * @param {PutRatingBody.model} body.body.required - PutRatingBody
 * @returns {object} 200 - JSON object of updated response
 * @returns {Error}  400 - Error message "Error: Response Does Not Exist!"
 */
router.route("/put-rating/:id").put((req, res) => {
  const raterId = req.body.userId;
  const rating = req.body.value;
  const newRating = {};
  newRating[raterId] = rating;
  DebateResponse.findById(req.params.id).then((response) => {
    const ratings = response.ratings;
    ratings.set(raterId, rating);
    DebateResponse.findByIdAndUpdate(
      req.params.id,
      { ratings: ratings },
      { useFindAndModify: false, new: true }
    )
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json("Error: Response Does Not Exist!"));
  });
});

/**
 * @typedef PutAvgBody
 * @property {number} avg.required - average rating of response
 */

/**
 * Update a response's average rating value
 * @route PUT /debate-responses/put-avg/{id}
 * @group Debates - Operations related to Debates
 * @param {string} id.path.required - id of debate response to update
 * @param {PutAvgBody.model} body.body.required - PutAvgBody
 * @returns {object} 200 - JSON object of updated response
 * @returns {Error}  400 - Error message "Error: Response Does Not Exist!"
 */
router.route("/put-avg/:id").put((req, res) => {
  const avg = req.body.avg;
  DebateResponse.findByIdAndUpdate(
    req.params.id,
    { avg: avg },
    { useFindAndModify: false, new: true }
  )
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json("Error: Response Does Not Exist!"));
});

module.exports = router;

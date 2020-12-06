const router = require("express").Router();
const { ACS_GROUPS } = require("../constants");
const acsValidators = require("../middleware/acsValidators");
const User = require("../models/user.model");

/**
 * Gets the ACS of a user given the userId
 * @route GET /acs/{id}
 * @group ACS - Operations related to ACS
 * @param {string} id.path.required - user's userId
 * @returns {object} 200 - JSON object with user's acs information
 * @returns {Error}  400 - Error message string
 */
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json({ acs: user.acs });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @typedef UpdateACSBody
 * @property {string} type.required - Type of ACS to update
 * @property {string} updatedACS.required - New ACS of user
 */

/**
 * Updates a user's ACS given the userId
 * @route PUT /acs/{id}
 * @group ACS - Operations related to ACS
 * @param {string} id.path.required - user's userId
 * @param {UpdateACSBody.model} body.body.required - Update ACS body
 * @returns {object} 200 - JSON object of updated user
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Error: could not find user"
 */
router.route("/:id").put(acsValidators.validate(), (req, res) => {
  const acsUpdateKey = Object.keys(ACS_GROUPS).find((key) =>
    ACS_GROUPS[key].includes(req.body.type)
  );

  User.findByIdAndUpdate(
    req.params.id,
    { $set: { [`acs.${acsUpdateKey}`]: req.body.updatedACS } },
    { useFindAndModify: false, new: true }
  )
    .then((updatedUser) => {
      if (updatedUser === null) {
        res.status(404).json("Error: could not find user");
      } else {
        res.status(200).json({ acs: updatedUser.acs });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

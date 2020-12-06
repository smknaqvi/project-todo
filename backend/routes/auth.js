const router = require("express").Router();
const User = require("../models/user.model");

/**
 * @typedef LoginBody
 * @property {string} username.required - Username of user
 * @property {string} password.required - Password of user
 */

/**
 * Login as a user
 * @route POST /auth/login
 * @group Auth - Operations related to Auth
 * @param {LoginBody.model} body.body.required - Login request body
 * @returns {object} 200 - JSON object of logged in user
 * @returns {Error}  400 - Error message "Error: invalid credentials"
 */
router.route("/login").post((req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  User.findOne({ username, password }, (err, user) => {
    if (err || !user) {
      res.status(400).json("Error: invalid credentials");
    } else if (user) {
      res.status(200).json(user);
    }
  });
});

module.exports = router;

const router = require("express").Router();
let User = require("../models/user.model");

router.route("/login").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username, password }, (err, user) => {
    if (err || !user) {
      res.status(400).json("Error: invalid credentials");
    } else if (user) {
      res.status(200).json("Authentication successful");
    }
  });
});

module.exports = router;

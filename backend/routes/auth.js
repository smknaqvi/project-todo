const router = require("express").Router();
const User = require("../models/user.model");

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

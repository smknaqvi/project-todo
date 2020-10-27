const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").get((_, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const displayName = req.body.username;
  const username = displayName.toLowerCase();
  const password = req.body.password;
  const age = req.body.age;
  const favSport = req.body.favSport;
  const levelOfPlay = req.body.levelOfPlay;
  const oddSport = req.body.oddSport;
  const favTeam = req.body.favTeam;
  const acs = 100;

  const newUser = new User({
    displayName,
    username,
    password,
    bioInfo: {
      age,
      favSport,
      levelOfPlay,
      oddSport,
      favTeam,
    },
    acs,
  });

  newUser
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json("Error: User Already Exists!"));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).json("Error: could not find user");
      } else {
        res.status(200).json(deletedUser);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
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

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).json("Error: could not find user");
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

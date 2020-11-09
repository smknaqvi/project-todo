const router = require("express").Router();
const User = require("../models/user.model");
const constants = require("../constants");
const { DEFAULT_PICTURE } = require("../constants");

router.route("/").get((_, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const displayName = req.body.username;
  const username = displayName.toLowerCase();
  const password = req.body.password;
  const birthday = req.body.birthday;
  const favSport = req.body.favSport;
  const levelOfPlay = req.body.levelOfPlay;
  const oddSport = req.body.oddSport;
  const favTeam = req.body.favTeam;
  const acs = 100;
  const picture = DEFAULT_PICTURE;

  const newUser = new User({
    displayName,
    username,
    password,
    bioInfo: {
      birthday,
      favSport,
      levelOfPlay,
      oddSport,
      favTeam,
    },
    acs,
    picture,
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
  const bioInfoToInsert = {
    bioInfo: {
      birthday: req.body.birthday,
      favSport: req.body.favSport,
      oddSport: req.body.oddSport,
      favTeam: req.body.favTeam,
      levelOfPlay: req.body.levelOfPlay,
      bio: req.body.bio,
    },
  };

  req.body = bioInfoToInsert;

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

router.route("/:ids").get((req, res) => {
  const ids = req.params.ids.split(",");
  User.find()
    .where("_id")
    .in(ids)
    .exec((err, records) => {
      if (err) {
        res.status(400).json("Error: " + err);
      } else if (records.length === 0) {
        res.status(404).json(records);
      } else {
        res.status(200).json(records);
      }
    });
});

router.route("/:id/profilepic").put((req, res) => {
  const picture = req.body.picture;

  req.body = picture;

  User.updateOne(
    { _id: req.params.id },
    {
      picture: picture,
    }
  )
    .then((updatedUser) => {
      if (updatedUser === null) {
        res.status(404).json("Error: could not find user");
      } else {
        res.status(200).json(updatedUser);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

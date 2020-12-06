const router = require("express").Router();
const User = require("../models/user.model");
const constants = require("../constants");
const { DEFAULT_PICTURE } = require("../constants");

/**
 * Get all users
 * @route GET /users
 * @group Users - Operations related to users
 * @returns {object} 200 - JSON array of all users
 * @returns {Error}  400 - Error message string
 */

router.route("/").get((_, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Get all users given a list of ids
 * @route GET /users/get-profiles
 * @group Users - Operations related to users
 * @param {Array} userids.query.required - User ids to return users for
 * @returns {object} 200 - JSON array of users
 * @returns {Error}  400 - Error message string
 */

router.route("/get-profiles/").get((req, res) => {
  User.find({ _id: { $in: req.query.userids } })
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @typedef UsersBody
 * @property {string} displayName.required - Display name of user
 * @property {string} password.required - Password of user
 * @property {string} birthday.required - Birthdate of user
 * @property {string} favSport - Favourite sport of user
 * @property {string} levelOfPlay - Highest Level of play of user
 * @property {string} oddSport - Sport user is interested in learning mroe about
 * @property {string} favTeam - Favourite sports team of user
 */

/**
 * Create a new user
 * @route POST /users
 * @group Users - Operations related to users
 * @param {UsersBody.model} body.body.required - UsersBody
 * @returns {object} 200 - JSON object of newly created user
 * @returns {Error}  400 - Error message "Error: User Already Exists!"
 */
router.route("/").post((req, res) => {
  const displayName = req.body.username;
  const username = displayName.toLowerCase();
  const password = req.body.password;
  const birthday = req.body.birthday;
  const favSport = req.body.favSport;
  const levelOfPlay = req.body.levelOfPlay;
  const oddSport = req.body.oddSport;
  const favTeam = req.body.favTeam;
  const acs = { games: 100, analysis: 100, history: 100, pPP: 100 };
  const assignedResponses = req.body.assignedResponses;
  const debates = req.body.debates;
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
    assignedResponses,
    debates,
    picture,
  });

  newUser
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json("Error: User Already Exists!"));
});

/**
 * Delete a user given the user's id
 * @route DELETE /users/{id}
 * @group Users - Operations related to users
 * @param {string} id.path.required - id of user to delete
 * @returns {object} 200 - JSON object of delete user
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Error: could not find user"
 */
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

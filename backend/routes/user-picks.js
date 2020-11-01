const router = require("express").Router();
let UserPick = require("../models/user-picks.model");

router.route("/:id").get((req, res) => {
  UserPick.findOne({ user: req.params.id }).then((picks) =>
    res.status(200).json(picks)
  )
  .catch(() => res.status(404).json("Error: UserPick Not Found!"));
});

router.route("/").post((req, res) => {
  const user = req.body.user;
  const picks = req.body.picks;
  const year = req.body.year;
  const results = req.body.results;
  const isEvaluated = req.body.isEvaluated;
  const newUserPick = new UserPick({
    year: year,
    user: user,
    picks: picks,
    results: results,
    isEvaluated: isEvaluated,
  });

  newUserPick
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json("Error: UserPick Already Exists!"));
});

router.route("/:id").put((req, res) => {
  UserPick.findOneAndUpdate(
    { user: req.params.id },
    {
      year: req.body.year,
      user: req.params.id,
      picks: req.body.picks,
      results: req.body.results,
      isEvaluated: req.body.isEvaluated,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((updatedUserPick) => {
      if (updatedUserPick === null) {
        res.status(404).json("Error: could not find userpick!");
      } else {
        res.status(200).json(updatedUserPick);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

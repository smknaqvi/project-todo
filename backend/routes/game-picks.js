const router = require("express").Router();
const GamePick = require("../models/game-picks.model");

router.route("/:id").get((req, res) => {
  GamePick.findOne({ user: req.params.id })
    .then((game) => res.status(200).json(game))
    .catch(() => res.status(404).json("Error: GamePick Not Found!"));
});

router.route("/").post((req, res) => {
  const user = req.body.user;
  const picks = req.body.picks;
  const isEvaluated = req.body.isEvaluated;
  const newGamePick = new GamePick({
    user: user,
    picks: picks,
    isEvaluated: isEvaluated,
  });

  newGamePick
    .save()
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(400).json("Error: GamePick Already Exists!"));
});

router.route("/:id").put((req, res) => {
  GamePick.findOneAndUpdate(
    { user: req.params.id },
    {
      user: req.params.id,
      picks: req.body.picks,
      isEvaluated: req.body.isEvaluated,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((updatedGamePick) => {
      if (updatedGamePick === null) {
        res.status(404).json("Error: could not find GamePick!");
      } else {
        res.status(200).json(updatedGamePick);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

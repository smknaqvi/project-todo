const router = require("express").Router();
const acsValidators = require("../middleware/acsValidators");
let User = require("../models/user.model");

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json({ acs: user.acs });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put(acsValidators.validate(), (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { acs: req.body.updatedACS },
    { useFindAndModify: false, new: true, runValidators: true }
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

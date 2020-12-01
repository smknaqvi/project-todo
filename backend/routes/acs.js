const router = require("express").Router();
const { ACS_GROUPS } = require("../constants");
const acsValidators = require("../middleware/acsValidators");
const User = require("../models/user.model");

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json({ acs: user.acs });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

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

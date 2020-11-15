const router = require("express").Router();
const DebateResponse = require("../models/response.model");

router.route("/").get((req, res) => {
  DebateResponse.find()
    .then((debateQuestion) => res.status(200).json(debateQuestion))
    .catch((error) =>
      res.status(404).json("Error: No Debates Responses Found")
    );
});

router.route("/:id").get((req, res) => {
  DebateResponse.findById(req.params.id)
    .then((response) => {
      if (response === null) {
        res.status(404).json("Response with this id not found!");
      } else {
        res.status(200).json(response);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const user = req.body.user;
  const content = req.body.content;
  const count = req.body.count;
  const ratings = req.body.ratings || new Map();
  const date = req.body.date ? new Date(req.body.date) : new Date();
  const response = new DebateResponse({
    user: user,
    content: content,
    count: count,
    ratings: ratings,
    date: date,
  });

  response
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json("Error: Response Already Exists!"));
});

module.exports = router;

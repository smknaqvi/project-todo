const router = require("express").Router();
const DebateResponse = require("../models/response.model");
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  DebateResponse.find()
    .then((debateQuestion) => res.status(200).json(debateQuestion))
    .catch((error) =>
      res.status(404).json("Error: No Debates Responses Found")
    );
});

router.route("/get-from-list-of-ids").get((req, res) => {
  DebateResponse.find({ _id: {$in : req.query.responseids}})
    .then((response) => {
      if (response === null) {
        res.status(404).json("Response with this id not found!");
      } else {
        res.status(200).json(response);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/get-assigned-responses/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json({ assignedResponses : user.assignedResponses });
    })
    .catch((err) => res.status(400).json("Error: " + err));
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

router.route("/update-count/:id").put((req, res) => {
  const count = req.body.count;
  DebateResponse.findByIdAndUpdate(req.params.id, {count : count}, { useFindAndModify: false, new: true })
  .then((response) => res.status(200).json(response))
  .catch((err) => res.status(400).json("Error: Response Does Not Exist!"));
});


router.route("/put-assigned-responses/:id").put((req, res) => {
  User.findByIdAndUpdate(req.params.id, { $push : { assignedResponses : req.body.response}}, { useFindAndModify: false, new: true })
  .then((response) => res.status(200).json(response))
  .catch((err) => res.status(400).json("Error: Response Does Not Exist!"));
});

router.route("/put-rating/:id").put((req, res) => {
  const raterId = req.body.userId;
  const rating = req.body.value;
  const newRating = {};
  newRating[raterId] = rating;
  DebateResponse.findById(req.params.id)
  .then((response) => {
    const ratings = response.ratings;
    ratings.set(raterId, rating);
    DebateResponse.findByIdAndUpdate(req.params.id, { ratings : ratings },
      { useFindAndModify: false, new: true })
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json("Error: Response Does Not Exist!"));
  })
});

router.route("/put-avg/:id").put((req, res) => {
  const avg = req.body.avg;
  DebateResponse.findByIdAndUpdate(req.params.id, { avg : avg }, { useFindAndModify: false, new: true })
  .then((response) => res.status(200).json(response))
  .catch((err) => res.status(400).json("Error: Response Does Not Exist!"));
});



module.exports = router;

const router = require("express").Router();
const Debate = require("../models/debate.model");

router.route("/:id").get((req, res) => {
  Debate.findById(req.params.id)
    .then((debate) => res.status(200).json(debate))
    .catch((error) => res.status(404).json("Error: Debate Not Found!"));
});

router.route("/get-by-date/:date").get((req, res) => {
  const date = new Date(req.params.date * 1000);
  Debate.find({
    date: date,
  })
    .then((debate) => {
      const usersDebate = debate.filter((debate) => {
        return debate.debaters.includes(req.body.userid);
      });
      res.status(200).json(usersDebate);
    })
    .catch((error) => res.status(404).json("Error: No Debates Found"));
});

router.route("/get-by-userid/:userid").get((req, res) => {
  Debate.find()
    .then((debate) => {
      const usersDebate = debate.filter((debate) => {
        return debate.debaterIds.includes(req.params.userid);
      });
      res.status(200).json(usersDebate);
    })
    .catch((error) => res.status(404).json(error));
});

router.route("/").get((req, res) => {
  Debate.find()
    .then((debates) => res.status(200).json(debates))
    .catch((error) => res.status(404).json("Error: No Debates Found!"));
});

router.route("/").post((req, res) => {
  const tier = req.body.tier;
  const debaters = req.body.debaterIds || [];
  const responses = req.body.responseIds || [];
  const question = req.body.question;
  const date = req.body.date ? new Date(req.body.date) : new Date();
  const isEvaluated = false;
  const newDebate = new Debate({
    tier: tier,
    debaterIds: debaters,
    responseIds: responses,
    question: question,
    date: date,
    isEvaluated: isEvaluated,
  });

  newDebate
    .save()
    .then((debate) => res.status(200).json(debate))
    .catch((err) => res.status(400).json(err));
});

router.route("/:id").put((req, res) => {
  Debate.findByIdAndUpdate(
    req.params.id,
    {
      tier: req.body.tier,
      debaterIds: req.body.debaterIds || [],
      responseIds: req.body.responseIds || [],
      question: req.body.question,
      date: req.body.date ? new Date(req.body.date) : new Date(),
      isEvaluated: req.body.isEvaluated || false,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((updatedDebate) => {
      if (updatedDebate === null) {
        res.status(404).json("Error: could not find Debate!");
      } else {
        res.status(200).json(updatedDebate);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get-by-tier/:tier").get((req, res) => {
  Debate.find({
    tier: req.params.tier,
  })
    .then((debate) => {
      res.status(200).json(debate);
    })
    .catch((error) => res.status(404).json("Error: No Debates Found"));
});

module.exports = router;

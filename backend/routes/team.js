const router = require("express").Router();
let Teams = require("../models/team.model");

router.route("/:id").get((req, res) => {
  Teams.findById(req.params.id)
    .then((team) => {
      if(team === null){
        res.status(404).json("Team with this id not found!");
      }
      else{
        res.status(200).json(team);
      }
      
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").get((_, res) => {
  Teams.find()
    .then((team) => res.status(200).json(team))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

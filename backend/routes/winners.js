const router = require("express").Router();
let Winners = require("../models/winners.model");

router.route("/:year").get((req, res) => {
  Winners.findOne({ year: req.params.year }).then((results) => {
    if(results === null){
      res.status(404).json("No Winners have been found for year: " + req.params.year);
    }
    else{
      res.status(200).json(results);
    }
  })
  .catch((error) => {
    res.status(400).json(error);
  });
    
      
});

module.exports = router;

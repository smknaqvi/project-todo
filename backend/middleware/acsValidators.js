const validate = (options) => (req, res, next) => {
  if (req.body.type != "DEMO") {
    let error = new Error("Invalid ACS Update");
    error.status = 400;
    res.status(400).send(error.message);
    next(error);
  } else if (req.body.updatedACS < 100 || req.body.updatedACS > 1100) {
    let error = new Error("ACS Score cannot be below 100 or above 1100.");
    error.status = 400;
    res.status(400).send(error.message);
    next(error);
  } else {
    next();
  }
};

module.exports = { validate: validate };

const { ACS_UPDATE_TYPES } = require("../constants");

const validate = (options) => (req, res, next) => {
  if (!ACS_UPDATE_TYPES.includes(req.body.type)) {
    const error = new Error("Invalid ACS Update");
    error.status = 400;
    res.status(400).send(error.message);
    next(error);
  } else if (req.body.updatedACS < 100 || req.body.updatedACS > 1100) {
    const error = new Error("ACS Score cannot be below 100 or above 1100.");
    error.status = 400;
    res.status(400).send(error.message);
    next(error);
  } else {
    next();
  }
};

module.exports = { validate: validate };

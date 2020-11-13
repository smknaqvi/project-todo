const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bracketWinnersSchema = new Schema(
  {
    matchNumber: {
      type: Number,
      max: 15,
      min: 1,
    },
    winnerID: {
      type: String,
    },
    year: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const bracketWinners = mongoose.model("bracketWinners", bracketWinnersSchema);

module.exports = bracketWinners;

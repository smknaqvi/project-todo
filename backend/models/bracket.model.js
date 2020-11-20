const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bracketSchema = new Schema(
  {
    teamOne: {
      type: String,
    },
    teamTwo: {
      type: String,
    },
    matchNumber: {
      type: Number,
      max: 15,
      min: 1,
    },
    isFirstMatch: {
      type: Boolean,
    },
    winner: {
      type: String,
    },
    year: {
      type: Number,
      required: true,
    },
    teamOneScore: {
      type: Number,
      max: 4,
      min: 0,
    },
    teamTwoScore: {
      type: Number,
      max: 4,
      min: 0,
    },
  },

  {
    timestamps: true,
  }
);

const bracketChoiceSchema = new Schema({
  teamOne: {
    type: String,
  },
  teamTwo: {
    type: String,
  },
  winnerChoice: {
    type: String,
  },
  userId: {
    type: String,
  },
  isFirstMatch: {
    type: Boolean,
  },
  teamOneScore: {
    type: Number,
    max: 4,
    min: 0,
  },
  teamTwoScore: {
    type: Number,
    max: 4,
    min: 0,
  },
  isEvaluated: {
    type: Boolean,
  },
  isWinnerCorrect: {
    type: Boolean,
  },
  isLoserScoreCorrect: {
    type: Boolean,
  },
  matchNumber: {
    type: Number,
    max: 15,
    min: 1,
  },
});

const Bracket = mongoose.model("Bracket", bracketSchema);
const BracketChoice = mongoose.model("BracketChoice", bracketChoiceSchema);

module.exports = { Bracket, BracketChoice };

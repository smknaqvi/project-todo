const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Team = require("../models/team.model");
const TeamSchema = Team.schema;

const bracketSchema = new Schema(
  {
    teams: {
      type: [TeamSchema],
      default: [],
    },
    year: {
      type: Number,
      required: true,
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
  winnerID: {
    type: String,
  },
  resultForWinner: {
    type: String,
  },
  userID: {
    type: String,
  },
  isFirstMatch: {
    type: Boolean,
  },
  winnerScore: {
    type: Number,
    max: 7,
    min: 0,
  },
  loserScore: {
    type: Number,
    max: 7,
    min: 0,
  },
  isEvaluated: {
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

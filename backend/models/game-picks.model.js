const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require("../models/games.model");
const gameSchema = Game.schema;

const gamePickSchema = new Schema({
  game: {
    type: gameSchema,
    required: true,
    unique: true,
  },
  pick: {
    type: String,
    required: true,
  },
});

const allGamePickSchema = new Schema({
  user: {
    type: String,
    unique: true,
    required: true,
  },
  picks: [gamePickSchema],
  isEvaluated: {
    type: Boolean,
  },
});

const allGamePick = mongoose.model("allGamePick", allGamePickSchema);

module.exports = allGamePick;

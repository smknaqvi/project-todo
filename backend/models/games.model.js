const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    date: {
      type: Number,
      required: true,
    },
    homeName: {
      type: String,
      required: true,
    },
    homeImage: {
      type: String,
    },
    awayName: {
      type: String,
      required: true,
    },
    awayImage: {
      type: String,
    },
    winner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Game = mongoose.model("Game", gameSchema);

module.exports = Game;

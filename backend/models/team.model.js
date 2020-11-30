const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Player = require("../models/player.model");
let playerSchema = Player.schema;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
      maxlength: 40,
    },
    abbrName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      minlength: 3,
      maxlength: 3,
    },
    picture: {
      type: String,
      required: true,
      trim: false,
    },
    players: {
      type: [playerSchema],
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Player = require("../models/player.model");
let playerSchema = Player.schema;

const userPickSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    unique: true,
    required: true,
  },
  picks: {
    mvp: {
      type: playerSchema,
    },
    rookieOTY: {
      type: playerSchema,
    },
    defensivePOTY: {
      type: playerSchema,
    },
    MIP: {
      type: playerSchema,
    },
    sixMan: {
      type: playerSchema,
    },
  },
  results: {
    mvp: {
      type: Boolean,
    },
    rookieOTY: {
      type: Boolean,
    },
    defensivePOTY: {
      type: Boolean,
    },
    MIP: {
      type: Boolean,
    },
    sixMan: {
      type: Boolean,
    },
  },
  isEvaluated: {
    type: Boolean,
  },
});

const UserPick = mongoose.model("UserPick", userPickSchema);

module.exports = UserPick;

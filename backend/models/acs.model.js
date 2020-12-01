const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const acsSchema = new Schema(
  {
    games: {
      type: Number,
      required: true,
      unique: false,
      min: 100,
      max: 1100,
    },
    analysis: {
      type: Number,
      required: true,
      unique: false,
      min: 100,
      max: 1100,
    },
    history: {
      type: Number,
      required: true,
      unique: false,
      min: 100,
      max: 1100,
    },
    pPP: {
      type: Number,
      required: true,
      unique: false,
      min: 100,
      max: 1100,
    },
  },
  {
    timestamps: true,
  }
);

const Acs = mongoose.model("Acs", acsSchema);

module.exports = Acs;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
      maxlength: 40,
    },
    picture: {
      type: String,
      required: true,
      trim: false,
    },
    rookie: {
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;

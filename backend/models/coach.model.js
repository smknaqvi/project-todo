const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coachSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 3,
      maxlength: 40,
    },
    teamId: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    picture: {
      type: String,
      required: true,
      trim: false,
    },
  },
  {
    timestamps: true,
  }
);

const Coach = mongoose.model("Coach", coachSchema);

module.exports = Coach;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      unique: false,
      trim: false,
      minlength: 4,
      maxlength: 128,
    },
    bioInfo: {
      age: {
        type: Number,
        required: true,
        unique: false,
        min: 13,
        max: 200,
      },
      favSport: {
        type: String,
        required: false,
        unique: false,
      },
      levelOfPlay: {
        type: String,
        required: false,
        unique: false,
      },
      oddSport: {
        type: String,
        required: false,
        unique: false,
      },
      favTeam: {
        type: String,
        required: false,
        unique: false,
      },
    },
    acs: {
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

const User = mongoose.model("User", userSchema);

module.exports = User;

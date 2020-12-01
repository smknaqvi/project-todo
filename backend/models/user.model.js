const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Acs = require("./acs.model");
const acsModel = Acs.schema;

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
    picture: {
      type: String,
      trim: true,
      required: true,
    },
    bioInfo: {
      birthday: {
        type: Date,
        required: true,
        unique: false,
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
      bio: {
        type: String,
        required: false,
        unique: false,
      },
    },
    acs: acsModel,
    debates: {
      type: [String],
    },
    assignedResponses: {
      type: [String],
    },
    triviaQuestionsCompleted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TriviaQuestion = require("./trivia-question.model");
const triviaQuestionModel = TriviaQuestion.schema;

const hhTriviaGameSchema = new Schema(
  {
    questions: {
      type: [triviaQuestionModel],
      required: true,
    },
    evaluated: {
      type: Boolean,
      default: false,
    },
    player1: {
      numCorrect: {
        type: Number,
        default: 0,
      },
      userId: {
        type: String,
      },
      startedGame: {
        type: Boolean,
        default: false,
      },
      acsChange: {
        type: Number,
        default: 0,
      },
    },
    player2: {
      numCorrect: {
        type: Number,
        default: 0,
      },
      userId: {
        type: String,
      },
      startedGame: {
        type: Boolean,
        default: false,
      },
      acsChange: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);
const HHTriviaGame = mongoose.model("HHTriviaGame", hhTriviaGameSchema);

module.exports = HHTriviaGame;

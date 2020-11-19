const mongoose = require("mongoose");
const Answer = require("./trivia-answer.model");
const answerSchema = Answer.schema;

const Schema = mongoose.Schema;
const triviaQuestionSchema = new Schema({
  question: {
    type: String,
  },
  responses: [
    {
      type: answerSchema,
    },
  ],
});
const TriviaQuestion = mongoose.model("TriviaQuestion", triviaQuestionSchema);

module.exports = TriviaQuestion;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const triviaAnswerSchema = new Schema({
  correct: {
    type: Boolean,
  },
  text: {
    type: String,
  },
});
const TriviaAnswer = mongoose.model("Answer", triviaAnswerSchema);

module.exports = TriviaAnswer;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// store all questions in a db
// upon generation of the debates, iterate through these questions and choose the users that will parrticipate in the debate for this question
const debateQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true
    },
    tier: {
      type: String,
      required: true
    },
  }
)
const debateQuestion = mongoose.model("debateQuestion", debateQuestionSchema);

module.exports = debateQuestion;

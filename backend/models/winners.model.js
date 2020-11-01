const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const winnersSchema = new Schema(
  {
    year: {
      type: String,
      required: true,
    },
    picks: {
      mvp: {
        type: String,
      },
      rookieOTY: {
        type: String,
      },
      defensivePOTY: {
        type: String,
      },
      MIP: {
        type: String,
      },
      sixMan: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Winners = mongoose.model("winners", winnersSchema);

module.exports = Winners;

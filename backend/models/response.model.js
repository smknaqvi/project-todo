const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const responseSchema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    ratings: {
      type: Map,
      required: true
    }
  },
  {
    timestamps: true,
  }
);
const Response = mongoose.model("Response", responseSchema);

module.exports = Response;

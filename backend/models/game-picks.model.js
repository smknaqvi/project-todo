const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allGamePickSchema = new Schema({
  user: {
    type: String,
    unique: true,
    required: true,
  },
  picks: {
    type: Map,
  },
});

const allGamePick = mongoose.model("allGamePick", allGamePickSchema);

module.exports = allGamePick;

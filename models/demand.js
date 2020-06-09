const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const demandSchema = new Schema({
  course: String,
  counter: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Demand", demandSchema);

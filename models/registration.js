const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registrationSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
  },
  //records timestamps automatically
  { timestamps: true }
);
module.exports = mongoose.model("Registration", registrationSchema);

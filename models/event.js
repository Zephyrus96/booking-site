const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  },
  location: {
    type: Object,
    required: false
  }
});

module.exports = mongoose.model("Event", eventSchema);

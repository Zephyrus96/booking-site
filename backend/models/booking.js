const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      _id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      }
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true } //Schema options
);

module.exports = mongoose.model("Booking", bookingSchema);

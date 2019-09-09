const Event = require("../../models/event");
const Booking = require("../../models/booking");
const checkAuth = require("../../middleware/is-auth");

const { transformEvent, transformBooking } = require("./multiUsage");

module.exports = {
  bookings: async (obj, { req }) => {
    const user = checkAuth(req);
    console.log(user);
    if (!user.isAuth) {
      return null;
    }
    try {
      const bookings = await Booking.find({ user: user.userID });
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  searchBooking: async ({ id }, { req }) => {
    const user = checkAuth(req);
    console.log(user);
    if (!user.isAuth) {
      return {
        isBooked: false,
        error: "You need to be logged in to book an event"
      };
    }
    try {
      const booking = await Booking.find({
        "event._id": id,
        user: user.userID
      });
      console.log(booking);
      if (booking.length > 0) {
        return {
          isBooked: true,
          error: null
        };
      }
      return {
        isBooked: false,
        error: null
      };
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async ({ id, title, date, location }, { req, res }) => {
    const user = checkAuth(req);
    if (!user.isAuth) {
      throw new Error("Log in to book an event.");
    }
    const booking = new Booking({
      user: user.userID,
      event: { _id: id, title, date, location }
    });
    const result = await booking.save();
    return transformBooking(result);
  },

  cancelBooking: async (args, { req }) => {
    const user = checkAuth(req);
    if (!user.isAuth) {
      throw new Error("Unauthorized");
    }
    try {
      const booking = await Booking.findOneAndRemove({
        user: user.userID,
        "event._id": args.eventID
      });
      console.log(booking);
      if (booking) {
        return "Booking successfully deleted!";
      }
      return "An error occurred.";
    } catch (err) {
      throw err;
    }
  }
};

const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

// const events = eventIDs => {
//   return Event.find({ _id: { $in: eventIDs } })
//     .then(events => {
//       return events.map(event => {
//         return transformEvent(event);
//       });
//     })
//     .catch(err => {
//       throw err;
//     });
// };

// const singleEvent = async eventID => {
//   try {
//     const event = await Event.findById(eventID);
//     return transformEvent(event);
//   } catch (err) {
//     throw err;
//   }
// };

const user = userID => {
  return User.findById(userID)
    .then(user => {
      return {
        ...user._doc,
        _id: user.id
      };
    })
    .catch(err => {
      throw err;
    });
};

const transformEvent = event => {
  return {
    _id: event._id, //returns id as a string
    title: event.title,
    date: dateToString(event.date),
    location: event.location
  };
};

const transformBooking = (booking, error) => {
  return {
    // ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking.user),
    event: transformEvent(booking.event),
    createdAt: dateToString(booking.createdAt),
    updatedAt: dateToString(booking.updatedAt)
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;

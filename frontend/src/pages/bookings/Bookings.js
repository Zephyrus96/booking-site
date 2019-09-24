import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { AuthContext } from "../../context/auth-context";
import { ModalContext } from "../../context/modal-context";
import LoadingIcon from "../../components/resources/loading";
import EventDetailsModal from "../../components/modal/eventDetails-modal";
import {
  AuthAlert,
  SuccessAnimatedAlert
} from "../../components/alerts/alerts";
import Backdrop from "../../components/backdrop/backdrop";
import "./bookings.scss";

const BookingsPage = () => {
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  const [loading, setLoading] = useState(false);
  const [bookingDeleted, setBookingDeleted] = useState({
    isDeleted: false,
    message: ""
  });
  const [bookingList, setBookingList] = useState([]);
  const [eventClicked, setEventClicked] = useState(false);
  const [chosenEvent, setChosenEvent] = useState({});

  const signInClicked = () => {
    modalContext.setAuthClicked(true);
    modalContext.setSignUp(false);
  };

  const signUpClicked = () => {
    modalContext.setAuthClicked(true);
    modalContext.setSignUp(true);
  };

  const getBookings = async () => {
    const res = await axios({
      url: "https://book-it-react-node.herokuapp.com/graphql",
      method: "post",
      data: {
        query: `query {
        bookings{
        event{
          _id
          title
          date
          location
        }
      }
    }`
      },
      withCredentials: true
    });

    const resData = res.data;
    let bookings = [];
    console.log(resData.data.bookings);
    resData.data.bookings.map(booking => {
      return (bookings = [
        ...bookings,
        {
          _id: booking.event._id,
          title: booking.event.title,
          start: booking.event.date,
          location: booking.event.location
        }
      ]);
    });
    setBookingList(bookings);
  };

  const cancelBooking = async () => {
    setLoading(true);
    setEventClicked(false);
    const res = await axios({
      url: "https://book-it-react-node.herokuapp.com/graphql",
      method: "post",
      data: {
        query: `mutation{
      cancelBooking(eventID: "${chosenEvent.id}")
    }`
      },
      withCredentials: true
    });
    const resData = res.data;
    setTimeout(() => {
      setLoading(false);
      setBookingDeleted({
        isDeleted: true,
        message: resData.data.cancelBooking
      });
    }, 1000);
  };

  const handleEventClick = date => {
    setEventClicked(true);
    const eventData = date.event;
    console.log(date);
    const id = eventData.extendedProps._id;
    const title = eventData.title;
    setChosenEvent({ id, title });
  };

  const closeModal = () => {
    setEventClicked(false);
  };

  useEffect(() => {
    getBookings();
    setTimeout(() => {
      setBookingDeleted({ isDeleted: false, message: "" });
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingDeleted.isDeleted]);

  return (
    <div className="bookings">
      {loading && <LoadingIcon />}
      {loading && <Backdrop show={true} />}

      {!authContext.token && (
        <AuthAlert
          signInClicked={signInClicked}
          signUpClicked={signUpClicked}
        />
      )}
      {authContext.token && (
        <div className="bookings__calendar">
          <h1>Bookings Calendar</h1>
          {bookingDeleted.isDeleted && !loading && (
            <SuccessAnimatedAlert message={bookingDeleted.message} />
          )}
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={bookingList}
            validRange={() => {
              return {
                start: Date.now()
              };
            }}
            eventClick={handleEventClick}
          />
        </div>
      )}
      {eventClicked && (
        <EventDetailsModal
          event={chosenEvent}
          closeModal={closeModal}
          cancelBooking={cancelBooking}
        />
      )}
      {eventClicked && <Backdrop show={true} clicked={closeModal} />}
    </div>
  );
};

export default BookingsPage;

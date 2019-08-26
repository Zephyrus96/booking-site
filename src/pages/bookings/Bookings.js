import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { AuthContext } from "../../context/auth-context";
import { ModalContext } from "../../context/modal-context";
import EventDetailsModal from "../../components/modal/eventDetails-modal";
import { AuthAlert } from "../../components/alerts/alerts";
import Backdrop from "../../components/backdrop/backdrop";
import "./bookings.scss";

const BookingsPage = () => {
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);
  const [bookingList, setBookingList] = useState([]);
  const [eventClicked, setEventClicked] = useState(false);

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
      url: "http://localhost:5000/graphql",
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
      bookings = [
        ...bookings,
        {
          _id: booking.event._id,
          title: booking.event.title,
          start: booking.event.date,
          location: booking.event.location
        }
      ];
    });
    setBookingList(bookings);
  };

  const handleEventClick = event => {
    setEventClicked(true);
    console.log(event.event);
  };

  const closeModal = () => {
    setEventClicked(false);
  };

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bookings">
      {!authContext.token && (
        <AuthAlert
          signInClicked={signInClicked}
          signUpClicked={signUpClicked}
        />
      )}
      {authContext.token && (
        <div className="bookings__calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={bookingList}
            eventClick={handleEventClick}
          />
        </div>
      )}
      {eventClicked && (
        <EventDetailsModal
          events={[
            { _id: "rsf1f13f", title: "Test 1" },
            { _id: "Teasfgf12f", title: "Test 2" }
          ]}
          closeModal={closeModal}
        />
      )}
      {eventClicked && <Backdrop show={true} clicked={closeModal} />}
    </div>
  );
};

export default BookingsPage;

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { AuthContext } from "../../context/auth-context";
import { ModalContext } from "../../context/modal-context";
import "./bookings.scss";
import { AuthAlert } from "../../components/alerts/alerts";

const BookingsPage = () => {
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const signInClicked = () => {
    modalContext.setAuthClicked(true);
    modalContext.setSignUp(false);
  };

  const signUpClicked = () => {
    modalContext.setAuthClicked(true);
    modalContext.setSignUp(true);
  };

  // const getBookings = () => {
  //   let requestBody = {
  //     query: `query{
  //     bookings{
  //       _id
  //       event{
  //         title
  //         description
  //       }
  //       user{
  //         email
  //       }
  //       createdAt
  //     }
  //   }`
  //   };

  //   const token = authContext.token;
  //   setLoading(true);

  //   fetch("http://localhost:5000/graphql", {
  //     method: "POST",
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token
  //     }
  //   })
  //     .then(res => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error("Failed!");
  //       }
  //       return res.json();
  //     })
  //     .then(resData => {
  //       setBookingList(resData.data.bookings);
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // };

  const getBookings = () => {};

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, authContext.token);

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
          <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
        </div>
      )}
    </div>
  );
};

export default BookingsPage;

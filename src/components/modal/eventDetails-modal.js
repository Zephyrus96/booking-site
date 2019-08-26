import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./eventDetails-modal.css";

const EventDetailsModal = props => {
  return (
    <div className="event-modal__container">
      <ul className="event-modal__list">
        <h2>You have {props.events.length} booked events on this day.</h2>
        {props.events.map(event => (
          <li key={event._id} className="event-modal__list-item">
            <h4>{event.title}</h4>
            <FaTrashAlt className="event-delete__icon" />
          </li>
        ))}
      </ul>
      <IoMdClose className="event-close__icon" onClick={props.closeModal} />
    </div>
  );
};

export default EventDetailsModal;

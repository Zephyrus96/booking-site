import React from "react";
import { NavLink } from "react-router-dom";

import "./event-item.css";

const EventItem = props => {
  const url = `/events/${props.id}`;
  return (
    <li key={props.id} className="event__list-item">
      <div className="event__item">
        <div className="event__image">
          <img src={props.imageURL} alt="eventImage" />
        </div>
        <div className="event__title">
          <h3>{props.title}</h3>
          {props.location.state !== null && (
            <small className="location__title">
              {props.location.venue}&nbsp;-&nbsp;{props.location.city},&nbsp;
              {props.location.state}
            </small>
          )}
          {!props.location.state === null && (
            <small className="location__title">
              {props.location.venue}&nbsp;-&nbsp;{props.location.city},&nbsp;
              {props.location.country}
            </small>
          )}
        </div>
      </div>
      <div className="event__details">
        <NavLink className="details__btn" to={url} role="button">
          View Details
        </NavLink>
      </div>
    </li>
  );
};

export default EventItem;

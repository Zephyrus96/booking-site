import React from "react";
import { MdAccessTime, MdLocationOn, MdAccessible } from "react-icons/md";

import "./eventInfo-modal.css";
import Backdrop from "../backdrop/backdrop";

const EventInfoModal = props => {
  return (
    <React.Fragment>
      <div className="event-info__container">
        <div className="event-info__header">
          <h3>Event Info</h3>
          <span className="cancel__modal" onClick={props.modalClosed}>
            x
          </span>
        </div>
        <div className="event-info__details">
          <h1>{props.title}</h1>
          {props.pleaseNote && (
            <div>
              <h3>Please Note:</h3>
              <p>{props.pleaseNote}</p>
            </div>
          )}
          <hr className="horizontal-rule" />
          {props.date && (
            <div className="event-info__date">
              <MdAccessTime className="event-info__icon" />
              <h3>Date:</h3>
              <h4>{props.date}</h4>
            </div>
          )}
          {props.venue && (
            <div className="event-info__location">
              <MdLocationOn className="event-info__icon" />
              <h3>Venue:</h3>
              <h4>{props.venue}</h4>
            </div>
          )}
          <hr className="horizontal-rule" />
          {props.lineups.length > 0 && (
            <div className="event-info__lineup">
              <h3>Lineup</h3>
              <div className="event-info__performers">
                {props.lineups.map((lineup, i) => {
                  return (
                    <div key={i}>
                      <img src={lineup.image} alt="lineup" />
                      <h4>{lineup.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {props.ticketLimit && (
            <div className="event-info__ticket">
              <h3>Ticket Limit</h3>
              <p>{props.ticketLimit}</p>
            </div>
          )}
          {props.accessible && (
            <div className="event-info__accessible">
              <h3>
                <MdAccessible className="event-info__icon" /> Accessible Tickets
              </h3>
              <p>{props.accessible}</p>
            </div>
          )}
          <small>Prices are in US $</small>
        </div>
      </div>
      <div>
        <Backdrop show={props.show} clicked={props.modalClosed} />
      </div>
    </React.Fragment>
  );
};

export default EventInfoModal;

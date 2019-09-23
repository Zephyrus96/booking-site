import React,{useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

import "./event-item.css";

const EventItem = props => {
  const url = `/events/${props.id}`;
  const [mobileView, setMobileView] = useState(false);

  const checkWidth = () => {
    if(window.innerWidth <= 800 && !mobileView){
      setMobileView(true);
    } else if(window.innerWidth > 800 && mobileView){
      setMobileView(false);
    }
  }

  useEffect(() => {
    checkWidth();
    
    window.addEventListener('resize', () => {
      checkWidth();
    })

    return () => {
      window.removeEventListener('resize', checkWidth());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[mobileView])

  return (
    <React.Fragment>
    {mobileView && <NavLink className="item__link" to = {url} role="button">
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
      </li>
    </NavLink>}
    {!mobileView &&
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
    }
    </React.Fragment>
  );
};

export default EventItem;

import React, { useState } from "react";
import gql from "graphql-tag";
import axios from "axios";
import { useQuery } from "@apollo/react-hooks";
import EventInfoModal from "../../components/modal/eventInfo-modal";
import LoadingIcon from "../../components/resources/loading";
import {
  IoLogoYoutube,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram
} from "react-icons/io";
import "./event-details.css";

const EventDetails = props => {
  const id = props.location.pathname.split("/")[2];

  const [showModal, setShowModal] = useState(false);

  const eventDetails = gql`
    query{
      eventDetails(eventID: "${id}"){
        _id
        title
        image{
          largeImage
        }
        date{
          startSalesDate
          endSalesDate
          startEventDate
        }
        seatmap
        socialMedia{
          youtube
          facebook
          twitter
          instagram
        }
        location{
          venue
          state
          city
          country
        }
        pleaseNote
        ticketLimit
        accessibility
      }
    }
  `;

  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit"
  };

  const showInfoModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const bookEvent = async () => {
    const res = await axios({
      url: "http://localhost:5000/graphql",
      method: "post",
      data: {
        query: `mutation {
      bookEvent(id: "${id}", title:"${data.eventDetails.title}"){
        user{
          email
        }
      }
    }`
      },
      withCredentials: true
    });

    const resData = await res.data;
    const errors = await res.errors;
    console.error(errors[0].message);
  };

  const { loading, data } = useQuery(eventDetails);

  if (loading) return <LoadingIcon />;

  let location;

  const date = new Intl.DateTimeFormat("en-US", options)
    .format(new Date(data.eventDetails.date.startEventDate))
    .replace(new RegExp(",", "g"), " • ");

  location = data.eventDetails.location.state
    ? data.eventDetails.location.venue +
      " - " +
      data.eventDetails.location.city +
      ", " +
      data.eventDetails.location.state
    : data.eventDetails.location.venue +
      " - " +
      data.eventDetails.location.city +
      ", " +
      data.eventDetails.location.country;

  return (
    <React.Fragment>
      <div className="event-details__container">
        <div className="event-details__main">
          <img src={data.eventDetails.image.largeImage} alt="event" />
          <div className="event-details__header">
            <h1>{data.eventDetails.title}</h1>
            <h3>{date}</h3>

            <h3>{location}</h3>

            <div className="social-media__icons">
              {data.eventDetails.socialMedia.youtube && (
                <a href={data.eventDetails.socialMedia.youtube}>
                  <IoLogoYoutube className="social-media__icon youtube-icon" />
                </a>
              )}
              {data.eventDetails.socialMedia.facebook && (
                <a href={data.eventDetails.socialMedia.facebook}>
                  <IoLogoFacebook className="social-media__icon facebook-icon" />
                </a>
              )}
              {data.eventDetails.socialMedia.twitter && (
                <a href={data.eventDetails.socialMedia.twitter}>
                  <IoLogoTwitter className="social-media__icon twitter-icon" />
                </a>
              )}
              {data.eventDetails.socialMedia.instagram && (
                <a href={data.eventDetails.socialMedia.instagram}>
                  <IoLogoInstagram className="social-media__icon instagram-icon" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="btn__group">
          <button className="btn__group-element" onClick={showInfoModal}>
            More Info
          </button>
          <button className="btn__group-element" onClick={bookEvent}>
            Book Event
          </button>
        </div>
      </div>
      {showModal && (
        <EventInfoModal
          title={data.eventDetails.title}
          pleaseNote={data.eventDetails.pleaseNote}
          date={date}
          venue={location}
          ticketLimit={data.eventDetails.ticketLimit}
          accessible={data.eventDetails.accessibility}
          show={showModal}
          modalClosed={closeModal}
        />
      )}
    </React.Fragment>
  );
};

export default EventDetails;

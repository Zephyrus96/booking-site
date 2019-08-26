import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EventItem from "../../components/event/event-item";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LoadingIcon from "../../components/resources/loading";
import axios from "axios";
import Dropdown from "../../components/dropdown/dropdown";
import { DropdownContext } from "../../context/dropdown-context";
import "./events.css";

const EventsPage = () => {
  const contextValue = useContext(DropdownContext);
  const [segmentID, setSegmentID] = useState("");
  const [genreID, setGenreID] = useState("");

  const eventOptions = ["All Events", "Concerts", "Sports", "Arts & Theater"];

  const eventsQuery = gql`
    query {
      events(eventID: "${segmentID}", genreID: "${genreID}", sort: "${contextValue.selectedSort}") {
        _id
        title
        image{
          smallImage
        }
        location{
          state
          city
          country
          venue
        }
      }
    }
  `;

  //Initializing the genre array.
  let arrayOptions = ["All Genres"];

  const getGenreURL = () => {
    let url = "";
    switch (contextValue.selectedEventType) {
      case "Concerts":
        setSegmentID("KZFzniwnSyZfZ7v7nJ");
        url =
          "https://app.ticketmaster.com/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ.json?apikey=8rSSwSsxdi8CCyPeSe8w7ROerzWc7eLw";
        break;
      case "Sports":
        setSegmentID("KZFzniwnSyZfZ7v7nE");
        url =
          "https://app.ticketmaster.com/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nE.json?apikey=8rSSwSsxdi8CCyPeSe8w7ROerzWc7eLw";
        break;
      case "Arts & Theater":
        setSegmentID("KZFzniwnSyZfZ7v7na");
        url =
          "https://app.ticketmaster.com/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7na.json?apikey=8rSSwSsxdi8CCyPeSe8w7ROerzWc7eLw";
        break;
      default:
        setSegmentID("");
        break;
    }

    return url;
  };

  const eventSelector = (eventName, e) => {
    switch (eventName) {
      case "All Events":
        contextValue.setSelectedEventType("All Events");
        contextValue.setActiveIndex(0);
        break;
      case "Concerts":
        contextValue.setSelectedEventType("Concerts");
        contextValue.setActiveIndex(1);
        break;
      case "Sports":
        contextValue.setSelectedEventType("Sports");
        contextValue.setActiveIndex(2);
        break;
      case "Arts & Theater":
        contextValue.setSelectedEventType("Arts & Theater");
        contextValue.setActiveIndex(3);
        break;
      default:
        break;
    }
  };

  const fillGenreDropdown = async url => {
    const res = await axios.get(url);
    const data = await res.data;
    contextValue.setOptions(data._embedded.genres);
  };

  const selectedGenre = () => {
    if (contextValue.selectedEventGenre !== arrayOptions[0]) {
      const genre = contextValue.options.filter(
        option => option.name === contextValue.selectedEventGenre
      );
      setGenreID(genre[0].id);
    } else {
      setGenreID("");
    }
  };

  useEffect(() => {
    contextValue.setSelectedEventGenre(arrayOptions[0]);
    contextValue.setActiveGenreIndex(0);
    contextValue.setSelectedSort("Most Popular");
    contextValue.setActiveSortIndex(0);
    fillGenreDropdown(getGenreURL());
    // eslint-disable-next-line
  }, [contextValue.selectedEventType]);

  useEffect(() => {
    selectedGenre();
    // eslint-disable-next-line
  }, [contextValue.selectedEventGenre]);

  //Set genres in dropdown.
  if (contextValue.options) {
    contextValue.options.map(option => arrayOptions.push(option.name));
  }

  const { loading, data } = useQuery(eventsQuery);

  return (
    <div className="events__container">
      <div className="event__navbar">
        {eventOptions.map((el, i) => (
          <NavLink
            to="#"
            className={i === contextValue.activeIndex ? "active-option" : ""}
            onClick={eventSelector.bind(this, el)}
          >
            <h4>{el}</h4>
          </NavLink>
        ))}
      </div>
      {loading && <LoadingIcon />}
      {!loading && (
        <React.Fragment>
          <div className="dropdown__container">
            <div className="dropdown__group">
              {contextValue.selectedEventType !== "All Events" && (
                <Dropdown
                  genre
                  options={arrayOptions}
                  selectedOption={contextValue.selectedEventGenre}
                />
              )}
            </div>
            <div className="sort__dropdown">
              <Dropdown
                sort
                options={["Most Popular", "Date", "Name A-Z", "Name Z-A"]}
                selectedOption={contextValue.selectedSort}
              />
            </div>
          </div>
          <ul className="events__list">
            {!data.events && <h1>No Events!</h1>}
            {data.events &&
              data.events.map(event => (
                <EventItem
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  location={event.location}
                  imageURL={event.image.smallImage}
                />
              ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default EventsPage;

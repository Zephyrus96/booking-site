import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Backdrop from "../backdrop/backdrop";
import { NavLink } from "react-router-dom";
import { API_KEY } from "../resources/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";

const MainSlider = props => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const sliderHover = () => {
    setShowBackdrop(true);
  };

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const getSliderData = async () => {
    const events = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/events.json?size=3&&apikey=" +
        API_KEY
    );
    setEvents(events.data._embedded.events);
    setLoading(false);
  };

  useEffect(() => {
    getSliderData();
  }, []);

  let images = [];
  if (!loading) {
    events.map(
      event =>
        (images = [
          ...images,
          event.images.find(
            image => image.width === 1024 && image.height === 683
          )
        ])
    );
  }

  return (
    !loading && (
      <Slider {...settings}>
        <div>
          <NavLink to={`/events/${events[0].id}`}>
            <div
              className="slider__item"
              style={{ backgroundImage: `url(${images[0].url})` }}
              onMouseEnter={sliderHover}
            >
              <div className="item__title">
                <h1>{events[0].name}</h1>
              </div>
              <div className="item-backdrop">
                <Backdrop show={showBackdrop} />
              </div>
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink to={`/events/${events[1].id}`}>
            <div
              className="slider__item"
              style={{ backgroundImage: `url(${images[1].url})` }}
            >
              <div className="item__title">
                <h1>{events[1].name}</h1>
              </div>
              <div className="item-backdrop">
                <Backdrop show={showBackdrop} />
              </div>
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink to={`/events/${events[2].id}`}>
            <div
              className="slider__item"
              style={{ backgroundImage: `url(${images[2].url})` }}
            >
              <div className="item__title">
                <h1>{events[2].name}</h1>
              </div>
              <div className="item-backdrop">
                <Backdrop show={showBackdrop} />
              </div>
            </div>
          </NavLink>
        </div>
      </Slider>
    )
  );
};

export default MainSlider;

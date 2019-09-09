import React from "react";

import MainSlider from "../../components/slider/slider";

import "./index.css";
import Backdrop from "../../components/backdrop/backdrop";

const IndexPage = () => {
  return (
    <div className="trending__slider">
      <h1>Trending Events</h1>
      <MainSlider />
      <Backdrop />
    </div>
  );
};

export default IndexPage;

import React from "react";
import { PinkBlob, GreenBlob, BlueBlob } from "../../resources/blob";
import { NavLink } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar__container">
      <nav>
        <ul className="navbar__list">
          <li className="navbar__list-item">
            <NavLink to="/">
              <h1>Home</h1>
            </NavLink>
            <PinkBlob className="pink-blob" />
          </li>
          <li className="navbar__list-item">
            <NavLink to="/events">
              <h1>Events</h1>
            </NavLink>
            <GreenBlob className="green-blob" />
          </li>
          <li className="navbar__list-item">
            <NavLink to="/bookings">
              <h1>Bookings</h1>
              <BlueBlob />
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr className="horizontal-rule" />
    </div>
  );
};

export default Navbar;

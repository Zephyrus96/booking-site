import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ModalContext } from "../../../context/modal-context";
import anime from "animejs";

import "./sidebar.css";

const Sidebar = props => {
  const modalContext = useContext(ModalContext);

  const timelineCallback = () => {
    const timeline = anime.timeline({ autoplay: false, loop: false });
    timeline
      .add({
        targets: ".sidebar-container",
        translateX: [-200, 0],
        opacity: [0, 1],
        duration: 250,
        easing: "linear"
      })
      .add({
        targets: ".sidebar__list-item",
        translateX: [-200, 0],
        opacity: [0, 1],
        delay: anime.stagger(200)
      });

    timeline.play();
  };

  useEffect(() => {
    timelineCallback();
  }, []);
  
  const closeMenu = () => {
    modalContext.setMenuOpened(false);
  };


  const listItems = (
    <React.Fragment>
      <li className="sidebar__list-item list-item-1" onClick={closeMenu}>
        <NavLink to="/">HOME</NavLink>
      </li>
      <li className="sidebar__list-item list-item-2" onClick={closeMenu}>
        <NavLink to="/events">EVENTS</NavLink>
      </li>
      <li className="sidebar__list-item list-item-3" onClick={closeMenu}>
        <NavLink to="/bookings">BOOKINGS</NavLink>
      </li>
    </React.Fragment>
  );

 
  return (
    <React.Fragment>
      {modalContext.menuOpened && (
        <div className="sidebar-container">
          <nav className="sidebar">
            <div className="site-logo">
              <img
                src={require("../../../images/3a882bd9-f5f4-4761-a100-5c873608216b_200x200.png")}
                alt="site-logo"
              />
            </div>
            <ul className="sidebar__list">{listItems}</ul>
            <span className="x-sign" onClick={closeMenu}>
              x
            </span>
          </nav>
        </div>
      )}
    </React.Fragment>
  );
};

export default Sidebar;

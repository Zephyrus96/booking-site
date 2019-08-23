import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import "./mainNav.css";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const logout = () => {
    authContext.logout();
  };
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>EasyEvent</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {!authContext.token && (
            <li className="nav-item">
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink to="/events">Events</NavLink>
          </li>
          {authContext.token && (
            <li className="nav-item">
              <NavLink to="/bookings">Bookings</NavLink>
            </li>
          )}

          {authContext.token && (
            <li className="logout-btn" onClick={logout}>
              <NavLink to="/auth">Logout</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

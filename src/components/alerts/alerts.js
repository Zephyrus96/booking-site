import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import "./alerts.css";

export const ErrorAlert = props => {
  return (
    <div className="error__container">
      <h4>The following errors occurred:</h4>
      <ul className="error__list">
        {props.errors.map(error => (
          <li className="error__list-item">{error}</li>
        ))}
      </ul>
    </div>
  );
};

export const SuccessAlert = props => {
  return (
    <div className="success__container">
      <h4>{props.message}</h4>
    </div>
  );
};

export const AuthAlert = props => {
  return (
    <div className="auth-alert__container">
      <FaExclamationTriangle className="auth-alert__user" />
      <h2>
        Please
        <button className="auth-alert__button" onClick={props.signInClicked}>
          <h2>Sign In</h2>
        </button>
        to view your bookings.
      </h2>
      <h3>
        Don't have an account?
        <button className="auth-alert__button" onClick={props.signUpClicked}>
          <h3>Sign Up</h3>
        </button>
      </h3>
    </div>
  );
};

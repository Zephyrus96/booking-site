import React from "react";
import "./backdrop.css";

const Backdrop = props => {
  return props.show ? (
    <div className="backdrop" onClick={props.clicked} />
  ) : null;
};

export default Backdrop;

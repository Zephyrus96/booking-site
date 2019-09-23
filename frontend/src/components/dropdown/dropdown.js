import React, { useState, useContext, useRef } from "react";
import DropdownArrow from "../resources/dropdown-arrow";
import { DropdownContext } from "../../context/dropdown-context";
import "./dropdown.css";

const Dropdown = props => {
  const contextValue = useContext(DropdownContext);

  const dropdownEl = useRef(null);
  const [className, setClassName] = useState("dropdown-list");

  const dropdownFocus = e => {
    setClassName("dropdown-list dropdown-list_active");
  };

  const dropdownBlur = () => {
    setClassName("dropdown-list");
  };

  // const checkFocus = () => {
  //   dropdownEl.current.className.includes("dropdown-list_active")
  //     ? setClassName("dropdown-list")
  //     : setClassName("dropdown-list dropdown-list_active ");
  // };

  const eventActive = (index, option) => {
    console.log(index);
    contextValue.setActiveEventIndex(index);
    contextValue.setSelectedEventType(option);
    dropdownEl.current.blur();
  };

  const genreActive = (index, option) => {
    contextValue.setActiveGenreIndex(index);
    contextValue.setSelectedEventGenre(option);
    dropdownEl.current.blur();
  };

  const sortActive = (index, option) => {
    contextValue.setActiveSortIndex(index);
    contextValue.setSelectedSort(option);
    dropdownEl.current.blur();
  };

  return (
    <React.Fragment>
      <div
        ref={dropdownEl}
        className={className}
        onFocus={dropdownFocus}
        onBlur={dropdownBlur}
        tabIndex={0}
      >
        <div className="dropdown-container">
          {props.sort && <label>Sort By: {props.selectedOption}</label>}
          {!props.sort && <label>{props.selectedOption}</label>}
          <DropdownArrow className="dropdown-arrow" />
        </div>
        {className === "dropdown-list dropdown-list_active" && (
          <div className="dropdown-options">
            <ul>
              {props.options.map((option, i) => (
                <li
                  key={i}
                  className={
                    props.event
                      ? "list-options " +
                        (i === contextValue.activeEventIndex
                          ? "item-active"
                          : "")
                      : props.genre
                      ? "list-options " +
                        (i === contextValue.activeGenreIndex
                          ? "item-active"
                          : "")
                      : props.sort
                      ? "list-options dropdown-sort" +
                        (i === contextValue.activeSortIndex
                          ? "item-active"
                          : "")
                      : null
                  }
                  onClick={
                    props.event
                      ? eventActive.bind(this, i, option)
                      : props.genre
                      ? genreActive.bind(this, i, option)
                      : sortActive.bind(this, i, option)
                  }
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Dropdown;

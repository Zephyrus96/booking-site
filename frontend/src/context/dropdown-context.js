import React, { useState, createContext } from "react";

export const DropdownContext = createContext();

export const DropdownProvider = props => {
  const [selectedEventType, setSelectedEventType] = useState("All Events");
  const [selectedEventGenre, setSelectedEventGenre] = useState("All Genres");
  const [selectedSort, setSelectedSort] = useState("Most Popular");
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activeGenreIndex, setActiveGenreIndex] = useState(0);
  const [activeSortIndex, setActiveSortIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [options, setOptions] = useState([]);

  const contextValue = {
    selectedEventType,
    setSelectedEventType,
    selectedEventGenre,
    setSelectedEventGenre,
    selectedSort,
    setSelectedSort,
    activeEventIndex,
    setActiveEventIndex,
    activeGenreIndex,
    setActiveGenreIndex,
    activeSortIndex,
    setActiveSortIndex,
    activeIndex,
    setActiveIndex,
    options,
    setOptions
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      {props.children}
    </DropdownContext.Provider>
  );
};

import React, { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import ResultLoading from "../resources/resultLoading";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./searchbox.css";

const SearchBox = () => {
  const searchEl = useRef(null);
  const resultEl = useRef(null);

  const [searchResults, setSearchResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [timer, setTimer] = useState(null);

  const searchKeyword = () => {
    clearTimeout(timer);
    if (searchEl.current.value.length > 1) {
      setLoadingResults(true);
      resultEl.current.style.display = "flex";
      setTimer(
        setTimeout(() => {
          searchEvents();
        }, 1000)
      );
    } else {
      setSearchResults([]);
      resultEl.current.style.display = "none";
    }
  };

  const searchEvents = async () => {
    console.log(searchEl.current.value);

    const url =
      "https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=" +
      searchEl.current.value +
      "&apikey=8rSSwSsxdi8CCyPeSe8w7ROerzWc7eLw";

    const res = await axios.get(url);
    const data = await res.data;
    if (data.page.totalElements > 0) {
      setSearchResults(data._embedded.events);
    } else {
      setSearchResults([]);
    }
    setLoadingResults(false);
  };

  const getImage = array => {
    return array.filter(image => image.width === 100 && image.height === 56);
  };

  const handleClick = () => {
    searchEl.current.value = "";
    resultEl.current.style.display = "none";
    setSearchResults([]);
  };

  return (
    <div className="search-box">
      <IoIosSearch className="search-icon" />
      <div className="search-box__input">
        <input
          ref={searchEl}
          type="text"
          placeholder="Search millions of events"
          onChange={searchKeyword}
        />
      </div>
      <div ref={resultEl} className="search__results">
        {loadingResults && <ResultLoading />}
        {!loadingResults && searchResults.length > 0 && (
          <ul>
            {searchResults.map((result, i) => (
              <li key={result.id} onClick={handleClick}>
                <NavLink to={`/events/${result.id}`}>
                  <div className="result-list__item">
                    <img src={getImage(result.images)[0].url} alt="eventImg" />
                    <h4>{result.name}</h4>
                  </div>
                </NavLink>
                {i !== searchResults.length - 1 && <hr />}
              </li>
            ))}
          </ul>
        )}
        {!loadingResults && searchResults.length === 0 && <h5>No Results!</h5>}
      </div>
    </div>
  );
};

export default SearchBox;

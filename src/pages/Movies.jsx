import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import { Link } from "react-router-dom";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);

  const performSearch = async (term) => {
    if (!term) {
      console.error("No search term provided");
      return [];
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=81761b68&s=${term}`
      );
      const data = await response.json();

      if (data.Search) {
        const filteredMovies = data.Search.slice(0, 6);
        setMovies(filteredMovies);
        console.log(filteredMovies);
        setLoading(false);
      } else {
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const getMovies = async (filter) => {
    setLoading(true);
    if (!movies.length) {
      await performSearch(searchTerm);
    }

    let displayMovies = [...movies];
    if (filter === "NEW_TO_OLD") {
      displayMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (filter === "OLD_TO_NEW") {
      displayMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }

    setMovies(displayMovies);
    setLoading(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    performSearch(searchTerm);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit(event);
    }
  };

  return (
    <>
      <div id="app">
        <div
          className="flex flex-col"
          style={{ display: "flex", flex: "1 1 0%" }}
        >
          <div className="navbar flex flex-col">
            <form
              id="input-wrap"
              className="content-wrapper__new flex-col align-center"
              style={{ marginTop: `50px` }}
            >
              <h1 data-v-390ceb07="">Browse Our Movies</h1>
              <div
                data-v-390ceb07=""
                className="input-wrap"
                onClick={handleSearchSubmit}
              >
                <input
                  data-v-390ceb07=""
                  id="searchInput"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleEnterPress}
                  placeholder="Search for movies..."
                />
                <div
                  data-v-390ceb07=""
                  onClick={handleSearchSubmit}
                  className="search-wrapper flex justify-center align-center"
                >
                  <svg
                    data-v-390ceb07=""
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="svg-inline--fa fa-search fa-w-16"
                  >
                    <path
                      data-v-390ceb07=""
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      className=""
                    ></path>
                  </svg>
                </div>
              </div>
            </form>
            <div data-v-390ceb07="" className="overlay"></div>
          </div>
          <section id="search">
            <div
              className="md-progress-bar md-indeterminate md-theme-default"
              style={{
                position: "absolute",
                top: `0px`,
                left: `0px`,
                right: `0px`,
              }}
            >
              <div className="md-progress-bar-track"></div>
              <div className="md-progress-bar-fill"></div>
              <div className="md-progress-bar-buffer"></div>
            </div>
            <div
              data-v-66aecfa2=""
              id="filter"
              className="content-wrapper justify-between"
            >
              <h1 data-v-66aecfa2="" className="search-info">
                <span data-v-66aecfa2="" className="black-txt">
                  Search results for:
                </span>
                <span
                  data-v-66aecfa2=""
                  style={{ textTransform: "capitalize" }}
                  id="output"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="movie"
                >
                  {searchTerm && <p> "{searchTerm}"</p>}
                </span>
              </h1>
              <select
                id="filter"
                defaultValue="DEFAULT"
                onChange={(e) => {
                  setFilter(e.target.value);
                  getMovies(e.target.value);
                }}
              >
                <option value="DEFAULT" disabled>
                  Sort
                </option>
                <option value="NEW_TO_OLD">Year, Newest to Oldest</option>
                <option value="OLD_TO_NEW">Year, Oldest to Newest</option>
              </select>
            </div>
            <div id="cars">
              <div className="content-wrapper">
                {error && <p>Error: {error}</p>}
                {loading && <div className="loading-state">Loading...</div>}
                <div id="results" className="loading-state flex justify-center">
                  {loading
                    ? new Array(6).fill(0).map((_, index) => (
                        <div className="post" key={index}>
                          <div className="post__title">
                            <div className="post__title--skeleton"></div>
                          </div>
                          <div className="post__body">
                            <p className="post__body--skeleton"></p>
                          </div>
                        </div>
                      ))
                    : movies.map((movie) => (
                        <div
                          key={movie.imdbID}
                          className="item"
                          data-imdb-id={movie.imdbID}
                        >
                          <Link to={`/movie/${movie.imdbID}`}>
                            <h2>{movie.Title}</h2>
                            <h3>{movie.Year}</h3>
                            <img src={movie.Poster} alt={movie.Title} />
                          </Link>
                        </div>
                      ))}
                      <div>
                  <svg
                    data-v-cf78a876=""
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="spinner"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="svg-inline--fa fa-spinner fa-w-16"
                    style={{ fontSize: "30px", color: "rgb(96, 48, 177)" }}
                  >
                    <path
                      data-v-cf78a876=""
                      fill="currentColor"
                      d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
                      className=""
                    ></path>
                  </svg>
                      </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div
        role="tooltip"
        id="el-tooltip-6582"
        aria-hidden="true"
        className="el-tooltip__popper is-dark"
        style={{
          display: "none",
          transformOrigin: "center bottom",
          zIndex: "2047",
        }}
      >
        <span>100000</span>
        <div
          x-arrow=""
          className="popper__arrow"
          style={{ left: "32px" }}
        ></div>
      </div>
    </>
  );
};

export default Movies;

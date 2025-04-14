import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Movies from "./Movies";
import axios from 'axios'; 

const Movie = () => {
  const { imdbID } = useParams();

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/movies" className="book__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/movies" className="book__link">
                <h2 className="book__selected--title--top">Movies</h2>
              </Link>
            </div>
            {/* <div key={imdbID} className="book__selected">
              <figure className="book__selected--figure">
                <img src={imdbID.Poster} alt="" className="book__selected--img" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{imdbID.Title}</h2>
                <div className="book__selected--price">
                {imdbID.Rated}
                {imdbID.Year}
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                  {imdbID.Plot}
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Movie;

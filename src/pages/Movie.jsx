import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Movies from "./Movies";
import axios from "axios";

const Movie = () => {
  const { imdbID } = useParams();
  const [dataImdbID, setDataImdbID] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=81761b68&i=${imdbID}`);
            const data = await response.json();

            // Check if the request was successful
            if (data.Response === "True") {
                setDataImdbID(data.ID); // Adjust with the correct property you need
                setData(data);
                console.log(data); // Log the full data for debugging
            } else {
                console.error('Error:', data.Error); // Handle error response
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [imdbID]);

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
            <div key={data.imdbID} className="book__selected">
              <figure className="book__selected--figure">
                <img src={data.Poster} alt="" className="book__selected--img" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{data.Title}</h2>
                <div className="movie__selected--info">
                Genre: {data.Genre}
                </div>
                <div className="movie__selected--info">
                Year: {data.Year}
                </div>
                <div className="movie__selected--info">
                Rated: {data.Rated}
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                  {data.Plot}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Movie;

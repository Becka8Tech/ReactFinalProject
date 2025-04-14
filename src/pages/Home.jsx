import React from "react";
import UndrawMovies from "../assets/movieHome.jpg"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section id="landing">
        <header>
          <div className="header__container">
            <div className="header__description">
              <h1>America's most awarded online movie search platform.</h1>
              <h2>
                Find your favoite <span className="purple">Movie</span>
              </h2>
                <Link to="/movies">
                    <button className="btn">Browse movies</button>
                </Link>
            </div>
            <figure className="header__img--wrapper">
              <img src={UndrawMovies} alt="" />
            </figure>
          </div>
        </header>
      </section>
    </>
  );
};

export default Home;

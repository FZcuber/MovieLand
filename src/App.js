import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import movieTitlesJson from "./movieTitles";

const movieTitles = movieTitlesJson.movies;

const api_key = "c3672265";

const API_URL = `https://www.omdbapi.com/?apikey=${api_key}&s=`;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const APP = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const promises = movieTitles.map((title) =>
        fetch(`${API_URL}${title}`).then((response) => response.json())
      );
      const results = await Promise.all(promises);
      const movies = results.reduce((acc, result) => {
        if (result.Search) {
          return [...acc, ...result.Search];
        }
        return acc;
      }, []);
      setMovies(shuffleArray(movies));
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className="app">
        <h1>MovieLand</h1>
        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchValue)}
          ></img>
        </div>
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => {
              return <MovieCard movie={movie} />;
            })}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default APP;

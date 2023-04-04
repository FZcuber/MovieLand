import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import movieTitlesJson from "./movieTitles";

// get movie titles from JSON file
const movieTitles = movieTitlesJson.movies;

// OMDB API key
const api_key = "c3672265";

// URL for OMDB API
const API_URL = `https://www.omdbapi.com/?apikey=${api_key}&s=`;

// function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Main App component
const APP = () => {
  // search value state
  const [searchValue, setSearchValue] = useState("");

  // movies state
  const [movies, setMovies] = useState([]);

  // function to search for movies
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  // useEffect hook to fetch movies on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      // create an array of promises to fetch movie data for each title
      const promises = movieTitles.map((title) =>
        fetch(`${API_URL}${title}`).then((response) => response.json())
      );

      // wait for all promises to resolve and combine movie data
      const results = await Promise.all(promises);
      const movies = results.reduce((acc, result) => {
        if (result.Search) {
          return [...acc, ...result.Search];
        }
        return acc;
      }, []);

      // shuffle the movie data and update state
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
            {/* For each movie in the movies array, render a MovieCard component */}
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
      {/* Any other components or elements that need to be rendered can go here */}
    </>
  );
};

export default APP;

import React from "react";
import { useState, useEffect } from "react";
const api_key = "c3672265";

const API_URL = `https://www.omdbapi.com/?apikey=${api_key}&s=`;

const APP = () => {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}${title}`);
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    searchMovies("superman");
  }, []);
  return (
    <>
      <div>
        <h1>React App</h1>
      </div>
    </>
  );
};

export default APP;

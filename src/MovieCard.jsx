import React from "react";

const MovieCard = ({ movie }) => {
  const styles = {
    movie: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "250px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "16px",
      margin: "16px",
      backgroundColor: "white",
    },
    moviePoster: {
      width: "100%",
      borderRadius: "5px",
    },
    movieTitle: {
      fontSize: "1.2em",
      fontWeight: "bold",
      marginTop: "8px",
      textAlign: "center",
    },
    movieYear: {
      fontSize: "1em",
      color: "#999",
      marginBottom: "8px",
    },
    movieType: {
      fontSize: "0.9em",
      fontStyle: "italic",
      marginBottom: "4px",
    },
  };

  return (
    <div style={styles.movie}>
      <div>
        <p style={styles.movieYear}>{movie.year}</p>
      </div>
      <div>
        <img
          style={styles.moviePoster}
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400"
          }
          alt="movie poster"
        ></img>
      </div>
      <div>
        <span style={styles.movieType}>{movie.Type}</span>
        <h3 style={styles.movieTitle}>{movie.Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;

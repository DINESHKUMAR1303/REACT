import React from "react";
import MovieCard from "./MovieCard";
import "./MovieRow.css";

const MovieRow = ({ title, movies = [], onMovieClick }) => {
  return (
    <section className="movie-row-wrapper container fade-in">
      <h2 className="row-title">{title}</h2>
      <div className="movie-row">
        {movies.map((item, i) => {
          // item might be { show: {...} } from search endpoint or raw show
          const movie = item.show ? item.show : item;
          return (
            <MovieCard key={movie.id || i} movie={movie} onMovieClick={() => onMovieClick(movie)} />
          );
        })}
      </div>
    </section>
  );
};

export default MovieRow;

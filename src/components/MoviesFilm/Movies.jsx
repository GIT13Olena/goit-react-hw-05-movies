import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MoviesContext } from './MoviesContext';

import search from '../../icons/white-searh.svg';

import './movies.module.css';

function Movies() {
  const { searchQuery, searchResults, handleSearchChange, handleSearchSubmit } =
    useContext(MoviesContext);

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="form-search">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input-search"
        />
        <img src={search} alt="svg search" onClick={handleSearchSubmit} />
      </form>
      <ul className="list-movies">
        {searchResults.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              )}
              <h2 className="title-movie">{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;

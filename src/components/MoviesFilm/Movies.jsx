// Movies.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MoviesContext } from './MoviesContext';
import './movies.module.css';

function Movies() {
  const { searchQuery, searchResults, handleSearchChange, handleSearchSubmit } =
    useContext(MoviesContext);

  return (
    <div>
      <h1 className="h1-movies">Movies</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input-search"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <h2>{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;

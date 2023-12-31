import React, { useEffect, useState, startTransition } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from '../api';

import defaultImg from '../../img/default img film.png';

import './home.module.css';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await getTrendingMovies();
      startTransition(() => {
        if (Array.isArray(response)) {
          setTrendingMovies(response);
        } else {
          setTrendingMovies([]);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="div-movies">
      <h1 className="div-movies-h1">Trending Movies</h1>
      <ul className="list-movies">
        {trendingMovies.map(movie => (
          <li key={movie.id} className="item-movie">
            <Link className="div-movies-link" to={`/movies/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              ) : (
                <img
                  src={defaultImg}
                  alt="Default Poster"
                  className="movie-poster"
                />
              )}
              <h2 className="titlt-movie">{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

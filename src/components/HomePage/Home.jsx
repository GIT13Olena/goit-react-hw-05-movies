import React, { useEffect, useState, startTransition } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from '../api';
import './home.module.css';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await getTrendingMovies();
      console.log('Response:', response);
      startTransition(() => {
        if (Array.isArray(response)) {
          console.log('Response data:', response);
          setTrendingMovies(response);
        } else {
          console.log('Invalid response structure:', response);
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
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link className="div-movies-link" to={`/movies/${movie.id}`}>
              <h2>&#127916;{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

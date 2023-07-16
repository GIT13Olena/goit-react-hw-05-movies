import React, { Suspense, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './app.module.css';

const Home = React.lazy(() => import('./HomePage/Home'));
const Movies = React.lazy(() => import('./MoviesFilm/Movies'));
const MovieDetails = React.lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = React.lazy(() => import('./Cast/Cast'));
const Reviews = React.lazy(() => import('./ReviewsFilm/Reviews'));

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = results => {
    setSearchResults(results);
  };

  return (
    <div>
      <nav className="header">
        <Link to="/" className="go-back-link">
          &#11164; Go Back
        </Link>
        <ul className="header-ul">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" className="nav-link">
              Search Movies
            </Link>
          </li>
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movies"
            element={
              <Movies
                searchResults={searchResults}
                handleSearchResults={handleSearchResults}
              />
            }
          />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/movies/:movieId/cast" element={<Cast />} />
          <Route path="/movies/:movieId/reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

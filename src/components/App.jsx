import React, { Suspense, useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './app.module.css';

const Home = React.lazy(() => import('./HomePage/Home'));
const Movies = React.lazy(() => import('./MoviesFilm/Movies'));
const MovieDetails = React.lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = React.lazy(() => import('./Cast/Cast'));
const Reviews = React.lazy(() => import('./ReviewsFilm/Reviews'));

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchResults = results => {
    setSearchResults(results);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <nav className="header">
        <Link to="/" className="go-back-link" onClick={handleGoBack}>
          &#11164; Go back
        </Link>
        <ul className="header-ul">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" className="nav-link">
              Search for movies
            </Link>
          </li>
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={location}>
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

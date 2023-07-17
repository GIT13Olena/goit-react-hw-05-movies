import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCast, getMovieReviews } from '../api';
import './movieDetalis.module.css';

function MovieDetails({ setPreviousPath }) {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isCastExpanded, setIsCastExpanded] = useState(false);
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(movieId);
        setMovie(response);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await getMovieCast(movieId);
        setCast(response.cast);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMovieReviews = async () => {
      try {
        const response = await getMovieReviews(movieId);
        setReviews(response.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
    fetchMovieReviews();
  }, [movieId]);

  const toggleCast = () => {
    setIsCastExpanded(!isCastExpanded);
  };

  const toggleReviews = () => {
    setIsReviewsExpanded(!isReviewsExpanded);
  };

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location.pathname, setPreviousPath]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { title, overview, poster_path, genres, vote_average } = movie;

  return (
    <div>
      <div className="details-container">
        <img
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt={title}
          className="img-poster"
        />

        <div className="details-right">
          <div className="div-detalis-film">
            <h1>{title}</h1>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <p> {genres.map(genre => genre.name).join(', ')}</p>
            <p>User Score: {vote_average}</p>
          </div>
        </div>
      </div>

      <div className="div-additional-info">
        <h2 className="h2-additional-info">Additional information</h2>
        <div>
          <button onClick={toggleCast} className="button-cast">
            {isCastExpanded ? 'Cast' : 'Cast'}
          </button>
          {isCastExpanded && (
            <ul className="ul-actors">
              {cast.map(member => (
                <li key={member.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                    alt={member.name}
                  />
                  <p className="ul-actors-p">
                    {member.name}
                    <br />
                    Character: {member.character}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <button onClick={toggleReviews} className="button-reviews">
            {isReviewsExpanded ? 'Reviews' : 'Reviews'}
          </button>
          {isReviewsExpanded && (
            <ul className="ul-all-reviews">
              {reviews.map(review => (
                <li key={review.id}>
                  <h2>Author: {review.author}</h2>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button onClick={handleGoBack} className="go-back-button">
        &#11164; Go Back
      </button>
    </div>
  );
}

export default MovieDetails;

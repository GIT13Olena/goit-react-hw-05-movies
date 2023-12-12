import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCast, getMovieReviews } from '../api';

import notPeople from '../../img/no people img.png';
import star from '../../icons/star.svg';

import './movieDetalis.module.css';

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isModalMoviesOpen, setIsModalMoviesOpen] = useState(false);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);

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

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { title, overview, poster_path, genres, vote_average } = movie;

  const openModalMovies = () => {
    setIsModalMoviesOpen(true);
  };

  const openModalReview = () => {
    setIsModalReviewOpen(true);
  };

  const closeModalMovies = () => {
    setIsModalMoviesOpen(false);
  };

  const closeModalReview = () => {
    setIsModalReviewOpen(false);
  };

  const handleOnClose = e => {
    if (e.code === 'Escape') {
      closeModalMovies();
      closeModalReview();
    }
  };

  window.addEventListener('keydown', handleOnClose);

  const handleOverlyClick = e => {
    if (e.currentTarget === e.target) {
      closeModalMovies();
    }
  };

  return (
    <div className="details-container">
      <div className="overlay">
        <img
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
          alt={title}
          className="img-poster"
        />

        <div className="details-right">
          <div className="div-detalis-film">
            <div className="title-evaluation">
              <h1>{title}</h1>
              <div className="star-container">
                <img src={star} alt="svg star" className="svg-star" />
                <p className="evaluation">{vote_average.toFixed(1)}</p>
              </div>
            </div>

            <h2 className="title-overview-genres">Overview</h2>
            <p>{overview}</p>
            <h2 className="title-overview-genres">Genres</h2>
            <p> {genres.map(genre => genre.name).join(', ')}</p>
          </div>
        </div>
      </div>

      <h2 className="h2-additional-info">Additional information</h2>

      <div>
        <button onClick={openModalMovies} className="button-cast">
          Cast
        </button>

        {isModalMoviesOpen && (
          <div className="modalOverly" onClick={handleOverlyClick}>
            <div className="modalContent">
              <button onClick={closeModalMovies} className="closeModalBtn">
                &#10006;
              </button>

              <ul className="ul-actors">
                {cast.map(member => (
                  <li key={member.id}>
                    {member.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                        alt={member.name}
                      />
                    ) : (
                      <img
                        src={notPeople}
                        alt="Default Poster"
                        className="movie-poster"
                      />
                    )}

                    <p className="ul-actors-p">
                      {member.name}
                      <br />
                      Character: {member.character}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <button onClick={openModalReview} className="button-reviews">
          Reviews
        </button>

        {isModalReviewOpen && (
          <div className="modalOverly" onClick={handleOverlyClick}>
            <div className="modalContent">
              <button onClick={closeModalReview} className="closeModalBtn">
                &#10006;
              </button>
              <ul className="ul-all-reviews">
                {reviews.map(review => (
                  <li key={review.id} className="item-review">
                    <h2>Author: {review.author}</h2>
                    <p>{review.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;

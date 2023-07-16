import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../api';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews();
  }, [movieId]);

  const fetchMovieReviews = async () => {
    try {
      const response = await getMovieReviews(movieId);
      setReviews(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;

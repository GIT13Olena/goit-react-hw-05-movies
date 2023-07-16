import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../api';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const credits = await getMovieCredits(movieId);
        setCast(credits.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <div>
      <h1>Cast</h1>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Cast;

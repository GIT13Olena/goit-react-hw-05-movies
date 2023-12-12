import React, { createContext, useEffect, useState } from 'react';
import { searchMovies } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(
    JSON.parse(localStorage.getItem('searchResults')) || []
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async event => {
    event.preventDefault();

    try {
      const response = await searchMovies(searchQuery);
      setSearchResults(response);

      const searchParams = new URLSearchParams();
      searchParams.set('query', searchQuery);
      navigate(`?${searchParams.toString()}`);

      localStorage.setItem('searchResults', JSON.stringify(response));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';
    setSearchQuery(query);
  }, [location.search]);

  const contextValue = {
    searchQuery,
    searchResults,
    handleSearchChange,
    handleSearchSubmit,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesContext, MoviesProvider };

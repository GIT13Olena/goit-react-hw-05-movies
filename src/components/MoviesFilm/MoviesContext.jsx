import React, { createContext, useState } from 'react';
import { searchMovies } from '../api';

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async event => {
    event.preventDefault();
    try {
      const response = await searchMovies(searchQuery);
      setSearchResults(response);
    } catch (error) {
      console.error(error);
    }
  };

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

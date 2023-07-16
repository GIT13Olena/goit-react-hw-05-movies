import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { MoviesProvider } from './components/MoviesFilm/MoviesContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename="/goit-react-hw-05-movies">
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </Router>
  </React.StrictMode>
);

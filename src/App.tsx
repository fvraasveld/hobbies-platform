import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BooksPage from './pages/BooksPage';
import MoviesPage from './pages/MoviesPage';
import HikingPage from './pages/HikingPage';
import CookingPage from './pages/CookingPage';
import ComingSoon from './components/common/ComingSoon';
import { BooksProvider } from './context/BooksContext';
import { MoviesProvider } from './context/MoviesContext';
import { RecipesProvider } from './context/RecipesContext';
import './App.css';

function App() {
  return (
    <BooksProvider>
      <MoviesProvider>
        <RecipesProvider>
          <Router>
            <div className="app">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/hiking" element={<HikingPage />} />
                <Route path="/cooking" element={<CookingPage />} />
                <Route path="/travel" element={<ComingSoon title="Travel Adventures" />} />
                <Route path="/sports" element={<ComingSoon title="Sports & F1" />} />
              </Routes>
            </div>
          </Router>
        </RecipesProvider>
      </MoviesProvider>
    </BooksProvider>
  );
}

export default App;

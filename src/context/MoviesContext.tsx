import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '../data/types';
import moviesData from '../data/movies.json';

interface MoviesContextType {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id' | 'dateAdded'>) => void;
  updateMovie: (id: string, updates: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  markAsWatched: (id: string, rating: number, review: string, dateWatched: string) => void;
  markAsToWatch: (id: string) => void;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('movies');
    if (stored) {
      setMovies(JSON.parse(stored));
    } else {
      setMovies(moviesData as Movie[]);
    }
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);

  const addMovie = (movie: Omit<Movie, 'id' | 'dateAdded'>) => {
    const newMovie: Movie = {
      ...movie,
      id: `movie-${Date.now()}`,
      dateAdded: new Date().toISOString(),
    };
    setMovies([...movies, newMovie]);
  };

  const updateMovie = (id: string, updates: Partial<Movie>) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...movie, ...updates } : movie
    ));
  };

  const deleteMovie = (id: string) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const markAsWatched = (id: string, rating: number, review: string, dateWatched: string) => {
    updateMovie(id, {
      status: 'watched',
      myRating: rating,
      myReview: review,
      dateWatched,
    });
  };

  const markAsToWatch = (id: string) => {
    updateMovie(id, {
      status: 'to-watch',
      myRating: undefined,
      myReview: undefined,
      dateWatched: undefined,
    });
  };

  return (
    <MoviesContext.Provider value={{ movies, addMovie, updateMovie, deleteMovie, markAsWatched, markAsToWatch }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within MoviesProvider');
  }
  return context;
};

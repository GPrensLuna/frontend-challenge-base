"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Movie {
  id: string;
  title: string;
}

interface FavoriteMoviesContextProps {
  favoriteMovies: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: string) => void;
}

const FavoriteMoviesContext = createContext<
  FavoriteMoviesContextProps | undefined
>(undefined);

const FavoriteMoviesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  const addFavorite = (movie: Movie): void => {
    setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFavorite = (movieId: string): void => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId),
    );
  };

  return (
    <FavoriteMoviesContext.Provider
      value={{ favoriteMovies, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

const useFavoriteMovies = (): FavoriteMoviesContextProps => {
  const context = useContext(FavoriteMoviesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoriteMovies must be used within a FavoriteMoviesProvider",
    );
  }
  return context;
};

export { FavoriteMoviesProvider, useFavoriteMovies };

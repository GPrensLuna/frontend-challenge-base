/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { useState } from "react";
import { usePopular } from "./hook/usePopular";
import BannerCard from "@/page/Home/components/BannerCard";
import { Movie } from "@/page/Home/typescript";

const PagePopulate = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [genreId] = useState<number | undefined>(undefined);
  const [favoriteMovies, setFavoriteMovies] = useState<Set<number>>(new Set());

  const { movies, loading, error } = usePopular({ page, genreId });

  const handlePageChange = (newPage: number): void => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  const handleFavoriteClick = (movieId: number): void => {
    setFavoriteMovies((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(movieId)) {
        updatedFavorites.delete(movieId);
      } else {
        updatedFavorites.add(movieId);
      }
      return updatedFavorites;
    });
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
      <div className="movies-container flex flex-wrap gap-4">
        {movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <BannerCard
              key={movie.id}
              movie={movie}
              onFavoriteClick={() => handleFavoriteClick(movie.id)}
              isFavorita={favoriteMovies.has(movie.id)}
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PagePopulate;

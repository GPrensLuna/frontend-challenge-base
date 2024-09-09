"use client";
import { useState, useEffect } from "react";
import { ApiResponse, Movie } from "../typescript";

interface UsePopularProps {
  page: number;
  genreId?: number;
}

export const usePopular = ({
  page,
  genreId,
}: UsePopularProps): {
  movies: Movie[];
  loading: boolean;
  error: string | null;
} => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/movies/popular`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data: ApiResponse = await response.json();

        if (data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      } catch (error) {
        setError("Error fetching movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, genreId]);

  return { movies, loading, error };
};

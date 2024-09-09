"use client";
import { useState, useEffect } from "react";
import { ApiResponse, Movie } from "../typescript";

export const useNowPlaying = (): {
  movies: Movie[];
  loading: boolean;
  error: string | null;
} => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const response = await fetch("/api/movies/nowPlaying");
        const data: ApiResponse = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError("Error fetching movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

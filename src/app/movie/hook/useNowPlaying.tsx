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
        const response = await fetch("/api/movie/now_playing");
        const data: ApiResponse = await response.json();
        setMovies(data.results);
      } catch {
        setError("Error fetching movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};

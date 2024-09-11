"use client";
import { useState, useEffect, useCallback } from "react";
import { ApiResponse, Movie } from "../typescript";
import { useSearchParams } from "next/navigation";
import useDebounce from "../hook/useDebounce";

export const usePopular = (): {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
} => {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const pageFromParams = Number(searchParams.get("page")) ?? 1;
    const queryFromParams = searchParams.get("query") ?? "";
    const genreFromParams = searchParams.get("with_genres") ?? "";

    if (pageFromParams !== page) {
      setPage(pageFromParams);
    }
    if (queryFromParams !== query) {
      setQuery(queryFromParams);
    }
    if (genreFromParams !== genre) {
      setGenre(genreFromParams);
    }
  }, [searchParams, page, query, genre]);

  const fetchMovies = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());

      if (debouncedQuery) params.set("query", debouncedQuery);
      if (genre) params.set("with_genres", genre);

      const url = `/api/movies/popular?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages ?? 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQuery, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    loading,
    error,
    totalPages,
    currentPage: page,
    setPage,
  };
};

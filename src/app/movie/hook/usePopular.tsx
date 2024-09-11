"use client";
import { useState, useEffect, useCallback } from "react";
import { ApiResponse, Movie } from "../typescript";
import { useSearchParams } from "next/navigation";

export const usePopular = (
  initialPage: number = 1,
): {
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
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || initialPage,
  );

  const setSearchParams = (params: URLSearchParams): void => {
    const url = new URL(window.location.href);
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    const pageFromParams = Number(searchParams.get("page"));
    if (!isNaN(pageFromParams) && pageFromParams !== currentPage) {
      setCurrentPage(pageFromParams);
    }
  }, [searchParams, currentPage]);

  const fetchMovies = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
      }).toString();

      const response = await fetch(`/api/movies/popular?${params}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages ?? 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const setPage = (page: number): void => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  return {
    movies,
    loading,
    error,
    totalPages,
    currentPage,
    setPage,
  };
};

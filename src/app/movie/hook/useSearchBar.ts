"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "./useDebounce";
import { MultiValue } from "react-select";

const DEBOUNCE_DELAY = 500;

interface GenreOption {
  value: number;
  label: string;
}

const useSearchBar = (): {
  query: string;
  genre: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenreChange: (selectedOptions: MultiValue<GenreOption>) => void;
} => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get("query") ?? "");
  const [genre, setGenre] = useState<string>(searchParams.get("genre") ?? "");

  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);
  const debouncedGenre = useDebounce(genre, DEBOUNCE_DELAY);

  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("query", debouncedQuery);
    if (debouncedGenre) params.set("genre", debouncedGenre);
    router.push(`?${params.toString()}`);
  }, [debouncedGenre, debouncedQuery, router]);

  const handleSearch = useCallback(() => {
    updateSearchParams();
  }, [debouncedQuery, debouncedGenre, updateSearchParams]);

  useEffect(() => {
    handleSearch();
  }, [debouncedQuery, debouncedGenre, handleSearch]);

  const handleChange = useCallback((name: string, value: string) => {
    if (name === "genre") {
      setGenre(value);
    } else if (name === "query") {
      setQuery(value);
    }
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      handleChange("query", e.target.value);
    },
    [handleChange],
  );

  const handleGenreChange = useCallback(
    (selectedOptions: MultiValue<GenreOption>): void => {
      handleChange(
        "genre",
        selectedOptions.map((option) => option.value.toString()).join(","),
      );
    },
    [handleChange],
  );

  return {
    query,
    genre,
    handleSearchChange,
    handleGenreChange,
  };
};

export default useSearchBar;

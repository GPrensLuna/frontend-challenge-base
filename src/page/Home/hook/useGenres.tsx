"use client";
import { useState, useEffect } from "react";

interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  genres: Genre[];
}

export const useGenres = (): {
  genres: Genre[];
  loading: boolean;
  error: string | null;
} => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async (): Promise<void> => {
      try {
        const response = await fetch("/api/movies/generes");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: GenresResponse = await response.json();
        setGenres(data.genres);
      } catch {
        setError("Error fetching genres");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};

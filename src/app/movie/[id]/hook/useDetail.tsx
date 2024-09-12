"use client";
import { Movie } from "@/app/movie/typescript";
import { useState, useEffect } from "react";

export const useDetail = ({
  id,
}: {
  id: number;
}): {
  movie: Movie[];
  loading: boolean;
  error: string | null;
} => {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/movies/${id}}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Movie[] = await response.json();
        setMovie(data);
      } catch (err) {
        setError("Error fetching genres");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { movie, loading, error };
};

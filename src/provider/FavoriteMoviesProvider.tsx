/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { Movie } from "@/page/Home/typescript";
import { errorToast, successToast } from "@/components/Alert/ToastSonner";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useSession } from "./SessionProvider";
import Swal from "sweetalert2";

interface FavoriteMoviesContextProps {
  favoriteMovies: Movie[];
  addFavorite: (movie: Movie) => Promise<void>;
  removeFavorite: (movieId: string) => Promise<void>;
  fetchFavoriteMovies: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const FavoriteMoviesContext = createContext<
  FavoriteMoviesContextProps | undefined
>(undefined);

const FavoriteMoviesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, profile } = useSession();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavoriteMovies = useCallback(async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/favorite?userId=${profile.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (response.ok) {
        const data: Movie[] = await response.json();
        setFavoriteMovies(data);
      } else {
        setError("Failed to load favorite movies list.");
        errorToast("Failed to load favorite movies list.");
      }
    } catch {
      setError("Error loading favorite movies list.");
      errorToast("Error loading favorite movies list.");
    } finally {
      setLoading(false);
    }
  }, [profile, loading]);

  useEffect(() => {
    fetchFavoriteMovies();
  }, [fetchFavoriteMovies, profile, isAuthenticated]);

  const showLoginAlert = (): void => {
    Swal.fire({
      title: "Login Required",
      text: "You need to be logged in to perform this action.",
      icon: "warning",
      confirmButtonColor: "#FF6600",
    });
  };
  const addFavorite = useCallback(
    async (movie: Movie): Promise<void> => {
      if (!isAuthenticated) {
        showLoginAlert();
        return;
      }

      try {
        const response = await fetch("/api/favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId: profile.id, movie }),
        });
        if (response.ok) {
          setFavoriteMovies((prevMovies) => {
            if (Array.isArray(prevMovies)) {
              return [...prevMovies, movie];
            } else {
              return [movie];
            }
          });
          successToast("Movie added to favorites.");
        } else {
          errorToast("Failed to add movie to favorites.");
        }
      } catch {
        errorToast("Error adding movie to favorites.");
      }
    },
    [profile],
  );

  const removeFavorite = useCallback(
    async (movieId: string): Promise<void> => {
      if (!profile) return;

      try {
        const response = await fetch(`/api/favorite/${movieId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: profile.id }),
        });
        if (response.ok) {
          setFavoriteMovies((prevMovies) =>
            prevMovies.filter((movie) => movie.id !== parseInt(movieId)),
          );
          successToast("Movie removed from favorites.");
        } else {
          errorToast("Failed to remove movie from favorites.");
        }
      } catch {
        errorToast("Error removing movie from favorites.");
      }
    },
    [profile],
  );

  return (
    <FavoriteMoviesContext.Provider
      value={{
        favoriteMovies,
        fetchFavoriteMovies,
        addFavorite,
        removeFavorite,
        loading,
        error,
      }}
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

/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { useEffect, useState, memo } from "react";
import { useFavoriteMovies } from "@/provider/FavoriteMoviesProvider";
import { Movie } from "@/page/Home/typescript";
import { errorToast } from "@/components/Alert/ToastSonner";
import Swal from "sweetalert2";
import { useSession } from "@/provider/SessionProvider";

interface FavoriteButtonProps {
  id: number;
  movie: Movie;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, id }) => {
  const { isAuthenticated } = useSession();
  const { favoriteMovies, addFavorite, removeFavorite } = useFavoriteMovies();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const showLoginAlert = (): void => {
    Swal.fire({
      title: "Login Required",
      text: "You need to be logged in to perform this action.",
      icon: "warning",
      confirmButtonColor: "#FF6600",
    });
  };
  useEffect(() => {
    if (Array.isArray(favoriteMovies)) {
      const isMovieFavorite = favoriteMovies.some(
        (favMovie) => favMovie.id === id,
      );
      setIsFavorite(isMovieFavorite);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteMovies, id]);

  const handleClick = async (): Promise<void> => {
    if (!isAuthenticated) {
      showLoginAlert();
      return;
    }
    try {
      if (isFavorite) {
        await removeFavorite(id.toString());
        setIsFavorite(false);
      } else {
        await addFavorite(movie);
        setIsFavorite(true);
      }
    } catch {
      errorToast("Error updating favorite status.");
    }
  };

  return (
    <button
      className="px-4 py-2 rounded text-black text-4xl"
      onClick={handleClick}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
};

export default memo(FavoriteButton);

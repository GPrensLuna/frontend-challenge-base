import { useEffect, useState, memo } from "react";
import { useFavoriteMovies } from "@/provider/FavoriteMoviesProvider";
import { Movie } from "@/page/Home/typescript";
import { errorToast } from "@/components/Alert/ToastSonner";

interface FavoriteButtonProps {
  id: number;
  movie: Movie;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, id }) => {
  const { favoriteMovies, addFavorite, removeFavorite } = useFavoriteMovies();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

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

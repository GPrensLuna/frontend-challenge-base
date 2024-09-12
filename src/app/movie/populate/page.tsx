/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { useState } from "react";
import { usePopular } from "../hook/usePopular";
import Alert from "@/components/Alert/Alert";
import BannerCard from "../components/BannerCard";
import PaginationControls from "@/components/Buttons/PaginationControls";

const PagePopular = (): React.JSX.Element => {
  const [favoritedMovies, setFavoritedMovies] = useState<Set<number>>(
    new Set(),
  );
  const { loading, movies, setPage, totalPages, currentPage } = usePopular();

  const handleFavoriteClick = async (movieId: number): Promise<void> => {
    const confirmed = await Alert.confirm(
      "Confirmación",
      "¿Deseas agregar o quitar esta película de tus favoritas?",
    );

    if (confirmed) {
      setFavoritedMovies((prev) => {
        const updatedFavorites = new Set(prev);

        if (updatedFavorites.has(movieId)) {
          updatedFavorites.delete(movieId);
          Alert.success(
            "Película removida de favoritas",
            "La película ha sido removida de tus favoritas.",
          );
        } else {
          updatedFavorites.add(movieId);
          Alert.success(
            "Película añadida a favoritas",
            "La película ha sido añadida a tus favoritas.",
          );
        }

        return updatedFavorites;
      });
    }
  };

  if (loading) return <p>Cargando películas...</p>;
  return (
    <>
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setPage}
      />
      <div className="flex flex-wrap gap-4 h-full">
        {movies.map((movie) => (
          <BannerCard
            key={movie.id}
            movie={movie}
            onFavoriteClick={() => handleFavoriteClick(movie.id)}
            isFavorita={favoritedMovies.has(movie.id)}
          />
        ))}
      </div>
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setPage}
      />
    </>
  );
};

export default PagePopular;

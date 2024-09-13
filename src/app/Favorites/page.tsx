/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { useEffect } from "react";
import { useFavoriteMovies } from "@/provider/FavoriteMoviesProvider";
import { useSession } from "@/provider/SessionProvider";
import BannerCard from "../movie/components/BannerCard";
import Link from "next/link";

const PageFavorite = (): JSX.Element => {
  const { favoriteMovies, fetchFavoriteMovies } = useFavoriteMovies();
  const { isAuthenticated } = useSession();
  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-800 p-6">
        <div className="flex flex-col items-center border-2 border-[#F0B90B] p-4 rounded-xl">
          <span className="text-6xl mb-4">🍿</span>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
            Hey there!
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
            You must log in to see your favorite movies.
          </p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(favoriteMovies)) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-800 p-6">
        <div className="flex flex-col items-center border-2 border-[#F0B90B] p-4 rounded-xl ">
          <span className="text-6xl mb-4">😢</span>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">
            Oops!
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-6">
            No favorite movies added yet. Start adding some to your list!
          </p>
          <Link
            href={"/"}
            className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition-colors"
          >
            Explore Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-white dark:bg-gray-800 h-screen">
      {favoriteMovies.map((movie) => (
        <BannerCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default PageFavorite;

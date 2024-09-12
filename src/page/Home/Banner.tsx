/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import { useUpcoming } from "./hook/useUpcoming";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Movie } from "./typescript";
import Alert from "@/components/Alert/Alert";
import RatingCircle from "./components/RatingCircle";
import FavoriteButton from "@/app/movie/components/FavoriteButton";

const BannerHome = (): JSX.Element => {
  const { error, loading, movies } = useUpcoming();
  const [isFavorita, setIsFavorita] = useState<boolean>(false);
  const [randomMovieIndex, setRandomMovieIndex] = useState<number | null>(null);

  useEffect(() => {
    const selectRandomMovie = (): void => {
      try {
        if (movies.length > 0) {
          const randomIndex = Math.floor(Math.random() * movies.length);
          setRandomMovieIndex(randomIndex);
        }
      } catch {
        Alert.error("Error seleccionando la película aleatoria.");
      }
    };

    selectRandomMovie();
    const intervalId = setInterval(selectRandomMovie, 60000);

    return (): void => clearInterval(intervalId);
  }, [movies]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (randomMovieIndex === null || !movies[randomMovieIndex]) {
    return <p>No movies available.</p>;
  }

  const randomMovie: Movie = movies[randomMovieIndex];

  if (!randomMovie.backdrop_path) {
    return <p>No movies available.</p>;
  }

  return (
    <section className="relative w-full h-[550px] bg-black">
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path}`}
          alt={`${randomMovie.title} backdrop`}
          fill
          sizes="(max-width: 1440px) 100vw, (max-width: 1440px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            objectPosition: "top center",
          }}
          role="img"
          loading="lazy"
          aria-label="Background"
          className="absolute inset-0 w-full h-full "
          placeholder="blur"
          blurDataURL={`https://image.tmdb.org/t/p/w500${randomMovie.backdrop_path}`}
        />

        <article className="absolute inset-0 flex flex-col md:flex-row justify-between items-end pl-8 md:pl-16 py-4 text-white z-20">
          <section className="flex flex-col w-full md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 truncate">
              {randomMovie.title}
            </h2>
            <p className="text-base font-semibold md:text-sm mb-4 text-ellipsis overflow-hidden">
              {randomMovie.overview}
            </p>
          </section>

          <section className="flex flex-col md:flex-row items-center w-full md:w-1/3 space-x-4 pr-24 pb-4 h-40 justify-end">
            <FavoriteButton
              key={randomMovie.id}
              id={randomMovie.id}
              movie={randomMovie}
            />
            <div className="pt-2 flex text-white items-center justify-center">
              <RatingCircle rating={randomMovie.vote_average} />
            </div>
          </section>
        </article>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-transparent to-transparent h-40 z-10 shadow-xl" />
      </div>
    </section>
  );
};

export default BannerHome;

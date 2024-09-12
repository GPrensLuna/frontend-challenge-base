/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import Image from "next/image";
import RatingCircle from "./RatingCircle";
import { Movie } from "../typescript";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { memo } from "react";

interface BannerCardProps {
  movie: Movie;
}

const BannerCard: React.FC<BannerCardProps> = ({ movie }) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-[220px] h-[435px]">
      <Link href={`/movie/${movie.id}`}>
        <figure className="w-[220px] h-[305px]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Poster de ${movie.title}`}
            width={270}
            height={335}
            style={{
              objectFit: "cover",
              objectPosition: "top center",
            }}
            className="w-full h-full object-cover"
          />
          <figcaption className="sr-only">{movie.title}</figcaption>
        </figure>
      </Link>

      <div className="p-2">
        <h3 className="text-base font-semibold">{movie.title}</h3>
        <div className="flex justify-between px-5">
          <FavoriteButton key={movie.id} id={movie.id} movie={movie} />
          <div className="pt-2 flex items-center justify-center">
            <RatingCircle rating={movie.vote_average} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BannerCard);

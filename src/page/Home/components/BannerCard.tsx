/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import Image from "next/image";
import { Movie } from "../typescript";
import FavoriteButton from "./FavoriteButton";
import RatingCircle from "./RatingCircle";
interface BannerCardProps {
  movie: Movie;
  onFavoriteClick: () => void;
  isFavorita: boolean;
}

const BannerCard: React.FC<BannerCardProps> = ({
  movie,
  onFavoriteClick,
  isFavorita,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-[270px] h-[435px]">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={270}
        height={335}
        style={{
          objectFit: "cover",
          objectPosition: "top center",
        }}
        className="w-[270px] h-[335px] object-cover"
      />
      <div className="p-2">
        <h3 className="text-base font-semibold">{movie.title}</h3>
        <div className="flex justify-between px-5">
          <FavoriteButton isFavorita={isFavorita} onClick={onFavoriteClick} />
          <div className="pt-2 flex items-center justify-center">
            <RatingCircle rating={movie.vote_average} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;

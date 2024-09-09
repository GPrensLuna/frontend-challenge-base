/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import Image from "next/image";
import { Movie } from "../typescript";

interface BannerCardProps {
  movie: Movie;
  onFavoriteClick: () => void;
  isFavorita: boolean;
}

const getColorByRating = (
  rating: number,
): "stroke-green-500" | "stroke-yellow-500" | "stroke-red-500" => {
  if (rating >= 7) return "stroke-green-500";
  if (rating >= 4) return "stroke-yellow-500";
  return "stroke-red-500";
};

const BannerCard: React.FC<BannerCardProps> = ({
  movie,
  onFavoriteClick,
  isFavorita,
}) => {
  const ratingPercentage = (movie.vote_average / 10) * 100;
  const colorClass = getColorByRating(movie.vote_average);

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
          <button
            className="px-4 py-2 rounded text-black text-4xl"
            onClick={onFavoriteClick}
          >
            {isFavorita ? "❤️" : "🤍"}
          </button>

          <div className="pt-2 flex items-center justify-center">
            <div className="relative w-12 h-12">
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 36 36"
              >
                <circle
                  className="text-gray-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                />
                <circle
                  className={`absolute top-0 left-0 w-full h-full ${colorClass}`}
                  strokeWidth="4"
                  strokeDasharray={`${ratingPercentage} ${100 - ratingPercentage}`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-sm font-semibold text-gray-900"
                >
                  {movie.vote_average.toFixed(1)}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;

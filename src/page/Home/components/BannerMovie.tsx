/* eslint-disable @typescript-eslint/naming-convention */
import React, { useRef } from "react";
import BackdropImage from "./BackdropImage";
import BannerCard from "./BannerCard";
import { Movie } from "../typescript";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface BannerMovieProps {
  section: {
    id: number;
    title: string;
    movies: Movie[];
  };
  onFavoriteClick: (movieId: number) => void;
  isFavorita: boolean;
}

const BannerMovie: React.FC<BannerMovieProps> = ({
  section,
  onFavoriteClick,
  isFavorita,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right"): void => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mb-6">
      {section.movies.length > 0 && (
        <BackdropImage
          backdropPath={section.movies[0].backdrop_path}
          title={section.title}
        />
      )}
      <div className="relative z-10 p-4">
        <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
        <div className="relative">
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth"
          >
            <div className="flex flex-nowrap gap-4">
              {section.movies.slice(0, 8).map((movie) => (
                <BannerCard
                  key={movie.id}
                  movie={movie}
                  onFavoriteClick={() => onFavoriteClick(movie.id)}
                  isFavorita={isFavorita}
                />
              ))}
            </div>
          </div>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            onClick={() => scroll("right")}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerMovie;

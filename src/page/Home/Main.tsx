/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import React, { useState } from "react";
import { usePopular } from "./hook/usePopular";
import { useNowPlaying } from "./hook/useNowPlaying";
import { useTopRated } from "./hook/useTopRated";
import { useUpcoming } from "./hook/useUpcoming";
import Alert from "@/components/Alert/Alert";
import BannerMovie from "./components/BannerMovie";

const Main = (): React.JSX.Element[] => {
  const [isFavorita, setIsFavorita] = useState<number | null>(null);

  const { movies: popular } = usePopular();
  const { movies: nowPlaying } = useNowPlaying();
  const { movies: topRated } = useTopRated();
  const { movies: upcoming } = useUpcoming();

  const moviesData = [
    {
      id: 1,
      title: "Popular",
      movies: popular,
    },
    {
      id: 2,
      title: "Now Playing",
      movies: nowPlaying,
    },
    {
      id: 3,
      title: "Top Rated",
      movies: topRated,
    },
    {
      id: 4,
      title: "Upcoming",
      movies: upcoming,
    },
  ];

  const handleFavoriteClick = async (movieId: number): Promise<void> => {
    const confirmed = await Alert.confirm(
      "Confirmación",
      "¿Deseas agregar o quitar esta película de tus favoritas?",
    );
    if (confirmed) {
      setIsFavorita((prevId) => (prevId === movieId ? null : movieId));
      Alert.success(
        `${
          isFavorita === movieId
            ? "Película removida de favoritas"
            : "Película añadida a favoritas"
        }`,
        `La película ha sido ${isFavorita === movieId ? "removida" : "añadida"} a tus favoritas.`,
      );
    }
  };

  return moviesData.map((section) => (
    <BannerMovie
      key={section.id}
      section={section}
      onFavoriteClick={handleFavoriteClick}
      isFavorita={isFavorita === section.id}
    />
  ));
};

export default Main;

/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { usePopular } from "./hook/usePopular";
import { useNowPlaying } from "./hook/useNowPlaying";
import { useTopRated } from "./hook/useTopRated";
import { useUpcoming } from "./hook/useUpcoming";
import BannerMovie from "./components/BannerMovie";

const Main = (): React.JSX.Element[] => {
  const { movies: popular } = usePopular();
  const { movies: nowPlaying } = useNowPlaying();
  const { movies: topRated } = useTopRated();
  const { movies: upcoming } = useUpcoming();

  const moviesData = [
    {
      id: 1,
      title: "Popular",
      movies: popular || [],
    },
    {
      id: 2,
      title: "Now Playing",
      movies: nowPlaying || [],
    },
    {
      id: 3,
      title: "Top Rated",
      movies: topRated || [],
    },
    {
      id: 4,
      title: "Upcoming",
      movies: upcoming || [],
    },
  ];

  return moviesData.map((section) => (
    <BannerMovie key={section.id} section={section} />
  ));
};

export default Main;

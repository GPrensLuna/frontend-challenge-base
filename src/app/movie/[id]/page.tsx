/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { useDetail } from "@/app/movie/[id]/hook/useDetail";
import { useParams } from "next/navigation";
import MovieDetail from "./components/MovieDetail";

const PageDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useDetail({ id: Number(id) });

  // Verifica que 'movie' sea un objeto y no un array
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie || Array.isArray(movie)) return <p>No movie found</p>;

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <MovieDetail movie={movie} />
    </div>
  );
};

export default PageDetail;

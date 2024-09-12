/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { usePopular } from "../hook/usePopular";
import BannerCard from "../components/BannerCard";
import PaginationControls from "@/components/Buttons/PaginationControls";

const PagePopular = (): React.JSX.Element => {
  const { loading, movies, setPage, totalPages, currentPage } = usePopular();

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
          <BannerCard key={movie.id} movie={movie} />
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

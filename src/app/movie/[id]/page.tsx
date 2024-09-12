"use client";
import { useDetail } from "@/app/movie/[id]/hook/useDetail";
import { useParams } from "next/navigation";

const PageDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { loading, error } = useDetail({ id: Number(id) });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Movie Details</h1>
    </div>
  );
};

export default PageDetail;

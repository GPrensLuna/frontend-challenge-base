/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Movie } from "@/page/Home/typescript";

export async function fetchPopularMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(`/api/movies/favorite`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error inesperado al obtener las películas.");
    }

    const data = await res.json();
    return data.results;
  } catch {
    throw new Error("Error inesperado al obtener las películas.");
  }
}

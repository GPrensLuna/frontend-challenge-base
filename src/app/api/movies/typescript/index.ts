import { Movie } from "@/page/Home/typescript";

export interface MoviesResponse {
  movies: Movie[] | [];
}
export interface FavoriteRequestBody {
  title?: string;
  movieId: string;
  userId: string;
}

export interface ErrorResponse {
  error: string;
}

/* eslint-disable @typescript-eslint/naming-convention */
import { Movie } from "@/page/Home/typescript";
import { NextResponse } from "next/server";

interface MoviesResponse {
  movies: Movie[] | [];
}

export async function GET(): Promise<NextResponse<MoviesResponse>> {
  try {
    const response = await fetch(
      // eslint-disable-next-line prettier/prettier
      `${process.env.NEXT_PUBLIC_API_URL}/movies/upcoming`,
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: MoviesResponse = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ movies: [] }, { status: 500 });
  }
}

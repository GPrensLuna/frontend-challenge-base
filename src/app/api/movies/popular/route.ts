/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse } from "next/server";
import { ErrorResponse, MoviesResponse } from "../typescript";

export async function GET(
  request: Request,
): Promise<NextResponse<MoviesResponse | ErrorResponse>> {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") ?? "1";
    const genreId = url.searchParams.get("genreId");

    // Construir la URL para la solicitud a la API
    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/movies/popular?page=${page}`;
    if (genreId) {
      apiUrl += `&with_genres=${genreId}`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: MoviesResponse = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error fetching movies" });
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse } from "next/server";
import { ErrorResponse, MoviesResponse } from "../typescript";

export async function GET({
  nextUrl,
}: {
  nextUrl: URL;
}): Promise<NextResponse<MoviesResponse | ErrorResponse>> {
  try {
    const page = nextUrl.searchParams.get("page") ?? "1";
    const response = await fetch(
      `${process.env.API_URL_BACKEND}/movies/popular?page=${page}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error retrieving data" },
      { status: 500 },
    );
  }
}

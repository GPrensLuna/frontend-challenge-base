/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse } from "next/server";
import { ErrorResponse, MoviesResponse } from "../typescript";

export async function GET(): Promise<
  NextResponse<MoviesResponse | ErrorResponse>
> {
  try {
    const response = await fetch(
      // eslint-disable-next-line prettier/prettier
      `${process.env.API_URL_BACKEND}/movies/top_rated`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      // eslint-disable-next-line prettier/prettier
      { status: 500 }
    );
  }
}

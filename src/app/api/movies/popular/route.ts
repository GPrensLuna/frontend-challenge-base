/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse, NextRequest } from "next/server";
import { ErrorResponse, MoviesResponse } from "../typescript";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<MoviesResponse | ErrorResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") ?? "1";

    const response = await fetch(
      `${process.env.API_URL_BACKEND}/movies/popular?page=${page}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

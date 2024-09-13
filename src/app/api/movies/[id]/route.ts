/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse, NextRequest } from "next/server";
import { ErrorResponse, MoviesResponse } from "../typescript";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<MoviesResponse | ErrorResponse>> {
  try {
    const url = new URL(request.url);

    const id = url.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is missing" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${process.env.API_URL_BACKEND}/movies/detail/${id}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching data`);
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

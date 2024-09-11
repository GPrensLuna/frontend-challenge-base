/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse } from "next/server";
import { ErrorResponse, MoviesResponse } from "../../typescript";

export async function GET({
  params,
}: {
  params: string;
}): Promise<NextResponse<MoviesResponse | ErrorResponse>> {
  try {
    // eslint-disable-next-line no-console
    console.log(params);
    const response = await fetch(
      `${process.env.API_URL_BACKEND}/movies/popular?page=2`,
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

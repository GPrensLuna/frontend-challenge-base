/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse } from "next/server";
import { ErrorResponse, MoviesResponse } from "../typescript";

export async function GET(): Promise<
  NextResponse<MoviesResponse | ErrorResponse>
> {
  try {
    const response = await fetch(
      // eslint-disable-next-line prettier/prettier
      `${process.env.NEXT_PUBLIC_API_URL}/movies/genres`,
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Traer generes" }, { status: 500 });
  }
}

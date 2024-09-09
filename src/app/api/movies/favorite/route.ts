/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextRequest, NextResponse } from "next/server";
import {
  ErrorResponse,
  FavoriteRequestBody,
  MoviesResponse,
} from "../typescript";

export async function GET(): Promise<
  NextResponse<MoviesResponse | ErrorResponse>
> {
  try {
    const response = await fetch(`${process.env.API_URL_BACKEND}/favorites`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: MoviesResponse = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ movies: [] }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<MoviesResponse | ErrorResponse>> {
  try {
    const body: FavoriteRequestBody = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`Error creating favorite: ${response.statusText}`);
    }

    const data: MoviesResponse = await response.json();

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<MoviesResponse | ErrorResponse>> {
  try {
    const body: FavoriteRequestBody = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
      {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(`Error deleting favorite: ${response.statusText}`);
    }

    const data: MoviesResponse = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete favorite" },
      { status: 500 }
    );
  }
}

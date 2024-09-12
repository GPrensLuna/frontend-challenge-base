/* eslint-disable @typescript-eslint/naming-convention */
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(
      `${process.env.API_URL_BACKEND}/auth/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // eslint-disable-next-line prettier/prettier
      },
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json("not Registration ", {
      status: 500,
    });
  }
}

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const apiUrlBackend = process.env.API_URL_BACKEND;

    if (!apiUrlBackend) {
      return NextResponse.json(
        { message: "API_URL_BACKEND is not defined." },
        { status: 500 },
      );
    }
    const authToken = req.cookies.get("Authentication");

    const response = await fetch(`${apiUrlBackend}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${authToken?.value}`,
      },
      credentials: "include",
    });

    const cookies = response.headers.get("set-cookie");
    const responseBody = await response.json();

    const nextResponse = NextResponse.json(responseBody);

    if (cookies) {
      nextResponse.headers.set("Set-Cookie", cookies);
    }

    return nextResponse;
  } catch {
    return NextResponse.json(
      {
        message: "An unexpected error occurred while processing your request.",
      },
      { status: 500 },
    );
  }
}

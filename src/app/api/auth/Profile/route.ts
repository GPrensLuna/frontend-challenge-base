/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const apiUrlBackend = process.env.API_URL_BACKEND;

    if (!apiUrlBackend) {
      return NextResponse.json(
        { message: "API_URL_BACKEND is not defined." },
        { status: 500 },
      );
    }
    const authToken = req.cookies.get("Authentication");
    console.log(authToken);

    const response = await fetch(`${apiUrlBackend}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${authToken?.value}`,
      },
      credentials: "include",
    });
    console.log(response);

    const cookies = response.headers.get("set-cookie");

    const responseBody = await response.json();
    console.log(responseBody);

    const nextResponse = NextResponse.json(responseBody);

    if (cookies) {
      nextResponse.headers.set("Set-Cookie", cookies);
    }
    console.log(nextResponse);
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

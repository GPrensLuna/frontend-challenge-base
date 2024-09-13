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
    const url = new URL(req.url);

    const authToken = req.cookies.get("authorization");
    const response = await fetch(`${apiUrlBackend}/favorite${url.search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
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

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const apiUrlBackend = process.env.API_URL_BACKEND;
    const { userId, movie } = await req.json();
    if (!apiUrlBackend) {
      return NextResponse.json(
        { message: "API_URL_BACKEND is not defined." },
        { status: 500 },
      );
    }
    const authToken = req.cookies.get("authorization");
    const response = await fetch(`${apiUrlBackend}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        userId: userId,
        movie: movie,
      }),
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

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const apiUrlBackend = process.env.API_URL_BACKEND;

    if (!apiUrlBackend) {
      return NextResponse.json(
        { message: "API_URL_BACKEND is not defined." },
        { status: 500 },
      );
    }

    const data = await req.json();
    const authToken = req.cookies.get("authorization");

    const response = await fetch(`${apiUrlBackend}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(data),
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
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

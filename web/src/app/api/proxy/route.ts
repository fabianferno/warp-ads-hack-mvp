import { NextResponse } from "next/server";

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  try {
    const metadata = await request.json();
    const response = await fetch(
      "https://agents.phala.network/ipfs/bafybeid7aiwj3y2o2zgiro2zeg3xqvp6nbbcivgnidbdohyi3x5lqxgwiu/0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata), // Forward the body from the original request
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in proxy:", error);
    return NextResponse.json({
      error: "Failed to fetch data from the external API.",
    });
  }
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}

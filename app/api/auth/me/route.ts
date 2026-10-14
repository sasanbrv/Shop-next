
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: session.userId,
        name: session.name,
        username: session.username,
      },
    });
  } catch (error) {
    console.error("Session API error:", error);

    return NextResponse.json(
      { message: "Could not retrieve session." },
      { status: 500 }
    );
  }
}

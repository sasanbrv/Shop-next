
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: `Product with id "${id}" not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...product,
      rating: {
        rate: product.ratingRate,
        count: product.ratingCount,
      },
    });
  } catch (error) {
    console.error("Product API error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

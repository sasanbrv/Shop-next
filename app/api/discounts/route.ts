
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const discounts = await prisma.discount.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(discounts);
  } catch (error) {
    console.error("Failed to fetch discounts:", error);

    return NextResponse.json(
      { message: "خطا در دریافت کدهای تخفیف" },
      { status: 500 }
    );
  }
}

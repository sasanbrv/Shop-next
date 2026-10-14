import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Get products error:", error);

    return NextResponse.json(
      { message: "Could not fetch products." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // فقط کاربر دارای سشن معتبر اجازه دارد محصول بسازد.
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in to add a product." },
        { status: 401 }
      );
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { message: "Invalid request body." },
        { status: 400 }
      );
    }

    if (
      !("title" in body) ||
      !("price" in body) ||
      !("category" in body) ||
      !("description" in body) ||
      !("image" in body) ||
      typeof body.title !== "string" ||
      typeof body.price !== "number" ||
      typeof body.category !== "string" ||
      typeof body.description !== "string" ||
      typeof body.image !== "string"
    ) {
      return NextResponse.json(
        { message: "Please provide valid product fields." },
        { status: 400 }
      );
    }

    const title = body.title.trim();
    const category = body.category.trim();
    const description = body.description.trim();
    const image = body.image.trim();
    const price = body.price;

    if (
      !title ||
      !category ||
      !description ||
      !image ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return NextResponse.json(
        { message: "All fields are required and price must be positive." },
        { status: 400 }
      );
    }

    if (
      title.length > 200 ||
      category.length > 100 ||
      description.length > 10000
    ) {
      return NextResponse.json(
        { message: "One or more fields exceed the allowed length." },
        { status: 400 }
      );
    }

    let imageUrl: URL;

    try {
      imageUrl = new URL(image);
    } catch {
      return NextResponse.json(
        { message: "Please provide a valid image URL." },
        { status: 400 }
      );
    }

    if (!["http:", "https:"].includes(imageUrl.protocol)) {
      return NextResponse.json(
        { message: "Image URL must use HTTP or HTTPS." },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        price,
        category,
        description,
        image,
        ratingRate: 0,
        ratingCount: 0,
      },
    });

    return NextResponse.json(
      {
        message: "Product added successfully.",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      { message: "Could not add product." },
      { status: 500 }
    );
  }
}
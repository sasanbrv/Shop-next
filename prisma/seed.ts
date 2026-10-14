
import "dotenv/config";
import { readFileSync } from "node:fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const db = JSON.parse(
    readFileSync(new URL("../app/database/db.json", import.meta.url), "utf8")
  );

  for (const item of db.products) {
    await prisma.product.upsert({
      where: { id: String(item.id) },
      update: {
        title: item.title,
        price: Number(item.price),
        description: item.description,
        category: item.category,
        image: item.image,
        ratingRate: item.rating?.rate ?? null,
        ratingCount: item.rating?.count ?? 0,
      },
      create: {
        id: String(item.id),
        title: item.title,
        price: Number(item.price),
        description: item.description,
        category: item.category,
        image: item.image,
        ratingRate: item.rating?.rate ?? null,
        ratingCount: item.rating?.count ?? 0,
      },
    });
  }

  for (const item of db.discount) {
    const percentage = Number(
      String(item.percenttage).replace("%", "")
    );

    if (!Number.isFinite(percentage)) {
      throw new Error(`Invalid discount percentage: ${item.code}`);
    }

    await prisma.discount.upsert({
      where: { code: item.code },
      update: { percentage },
      create: {
        id: String(item.id),
        code: item.code,
        percentage,
      },
    });
  }

  console.log(`Products imported: ${db.products.length}`);
  console.log(`Discounts imported: ${db.discount.length}`);
}

main()
  .catch((error) => {
    console.error("Import failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


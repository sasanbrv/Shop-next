
import AddToCart from "@/app/components/AddToCart";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface IProductProps {
  params: Promise<{ id: string }>;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function Product({ params }: IProductProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  const ratingRate = product.ratingRate;
  const ratingCount = product.ratingCount;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex h-[360px] items-center justify-center overflow-hidden bg-slate-50 p-6 sm:h-[420px] lg:h-[480px]">
              <div className="absolute left-5 top-5 z-10 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
                Featured
              </div>

              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Sasy Shop
              </span>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {product.title}
              </h1>

              <div className="mt-3 flex items-center gap-2">
                <div className="text-sm tracking-wide text-yellow-400">
                  ★★★★★
                </div>

                <span className="text-xs font-medium text-slate-400">
                  {ratingRate ?? "—"} / 5
                </span>

                <span className="text-xs text-slate-400">
                  ({ratingCount} reviews)
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                {product.description}
              </p>

              <div className="my-5 h-px bg-slate-100" />

              <div>
                <span className="text-xs font-medium text-slate-400">
                  Price
                </span>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    ${product.price}
                  </span>

                  <span className="text-xs font-medium text-slate-400">
                    USD
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Quantity
                </span>

                <AddToCart id={product.id} />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-5">
                <div className="text-center">
                  <div className="text-lg">🚚</div>
                  <p className="mt-1 text-[10px] font-medium text-slate-500">
                    Fast Delivery
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-lg">✓</div>
                  <p className="mt-1 text-[10px] font-medium text-slate-500">
                    Quality Product
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-lg">↩</div>
                  <p className="mt-1 text-[10px] font-medium text-slate-500">
                    Easy Returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;

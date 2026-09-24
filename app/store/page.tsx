
import Link from "next/link";
import ProductItem from "../components/ProductItem";
import { IProductItemProps } from "./../components/ProductItem";

async function Store() {
  const result = await fetch("http://localhost:3004/products");
  const data = (await result.json()) as IProductItemProps[];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 inline-block text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Sasy Shop
            </span>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Explore Our Products
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Discover our collection of high-quality products carefully selected
              for your everyday needs.
            </p>
          </div>

          <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-500 shadow-sm">
            {data.length} Products
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/store/${item.id}`}
              className="block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
            >
              <ProductItem {...item} />
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

export default Store;

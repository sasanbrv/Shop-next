
import AddToCart from "@/app/components/AddToCart";
import { IProductItemProps } from "@/app/components/ProductItem";

interface IProductProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<object>;
}

async function Product({ params }: IProductProps) {
  const { id } = await params;

  const result = await fetch(`http://localhost:3004/products/${id}`);
  const data = (await result.json()) as IProductItemProps;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Product Card */}
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Product Image */}
            <div className="relative flex h-[360px] items-center justify-center overflow-hidden bg-slate-50 p-6 sm:h-[420px] lg:h-[480px]">

              {/* Featured Badge */}
              <div className="absolute left-5 top-5 z-10 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20">
                Featured
              </div>

              {/* Image */}
              <img
                src={data.image}
                alt={data.title}
                className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">

              {/* Brand */}
              <span className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Sasy Shop
              </span>

              {/* Title */}
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {data.title}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="text-sm tracking-wide text-yellow-400">
                  ★★★★★
                </div>

                <span className="text-xs font-medium text-slate-400">
                  4.8 / 5
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-7 text-slate-500">
                {data.description}
              </p>

              {/* Divider */}
              <div className="my-5 h-px bg-slate-100" />

              {/* Price */}
              <div>
                <span className="text-xs font-medium text-slate-400">
                  Price
                </span>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    ${data.price}
                  </span>

                  <span className="text-xs font-medium text-slate-400">
                    USD
                  </span>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-5">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Quantity
                </span>

                <AddToCart id={id}/>
              </div>

              {/* Add To Cart */}
              <button
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/25 active:translate-y-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L6.75 15.75h10.5l2.25-8.25H5.106ZM6.75 15.75l-.75 2.25h12.75"
                  />
                </svg>

                Add to Cart
              </button>

              {/* Features */}
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
